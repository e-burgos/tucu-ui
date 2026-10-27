import { createServer } from 'node:http';
import { readFile, readdir, realpath, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { homedir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import {
  findRtkBinary,
  rtkBinaryVersion,
} from '../scripts/rtk-common.mjs';

const DEFAULT_PORT = 4310;
const HOST = '127.0.0.1';

// With NX_WORKSPACE_ROOT_PATH pointing elsewhere, every `nx …` run from here targets THAT
// workspace and reports success — warned on the first line, before anything else.
{
  const nxRoot = process.env.NX_WORKSPACE_ROOT_PATH;
  if (nxRoot && path.resolve(nxRoot) !== path.resolve(fileURLToPath(new URL('../..', import.meta.url)))) {
    console.warn(
      `[sdd:docs] ⚠ NX_WORKSPACE_ROOT_PATH=${nxRoot} is not this repo (${path.resolve(fileURLToPath(new URL('../..', import.meta.url)))}) — any \`nx\` command run here targets THAT workspace.`,
    );
  }
}

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.yaml': 'text/yaml; charset=utf-8',
  '.yml': 'text/yaml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
};

function parseCliArgs(argv) {
  const parsed = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--port' && argv[i + 1] !== undefined) {
      parsed.port = argv[i + 1];
      i++;
    } else if (argv[i] === '--root' && argv[i + 1] !== undefined) {
      parsed.root = argv[i + 1];
      i++;
    }
  }
  return parsed;
}

function resolveRoot(cliArgs) {
  if (cliArgs.root) return path.resolve(process.cwd(), cliArgs.root);
  return path.resolve(fileURLToPath(new URL('../../', import.meta.url)));
}

function resolvePort(cliArgs) {
  return Number(cliArgs.port ?? process.env.SDD_DOCS_PORT ?? DEFAULT_PORT);
}

function isWithinRoot(root, target) {
  return target === root || target.startsWith(root + path.sep);
}

function splitUrl(rawUrl) {
  const withoutHash = rawUrl.split('#')[0];
  const queryIndex = withoutHash.indexOf('?');
  if (queryIndex === -1) return { rawPath: withoutHash, rawQuery: '' };
  return {
    rawPath: withoutHash.slice(0, queryIndex),
    rawQuery: withoutHash.slice(queryIndex),
  };
}

function respond(req, res, status, headers, body) {
  res.writeHead(status, { 'Cache-Control': 'no-store', ...headers });
  if (req.method === 'HEAD' || body === undefined) {
    res.end();
  } else {
    res.end(body);
  }
}

function sendPlainText(req, res, status, message, extraHeaders = {}) {
  const buffer = Buffer.from(message, 'utf-8');
  respond(
    req,
    res,
    status,
    {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Length': buffer.length,
      ...extraHeaders,
    },
    buffer,
  );
}

function send400(req, res) {
  sendPlainText(req, res, 400, 'Bad Request');
}

function send403(req, res) {
  sendPlainText(req, res, 403, 'Forbidden');
}

function send404(req, res) {
  sendPlainText(req, res, 404, 'Not Found');
}

function send405(req, res) {
  sendPlainText(req, res, 405, 'Method Not Allowed', { Allow: 'GET, HEAD' });
}

function send500(req, res) {
  sendPlainText(req, res, 500, 'Internal Server Error');
}

async function serveFile(req, res, filePath, ext) {
  let data;
  try {
    data = await readFile(filePath);
  } catch (err) {
    if (err.code === 'ENOENT') return send404(req, res);
    return send500(req, res);
  }
  const contentType = CONTENT_TYPES[ext] ?? 'application/octet-stream';
  respond(
    req,
    res,
    200,
    { 'Content-Type': contentType, 'Content-Length': data.length },
    data,
  );
}

async function handleDirectory(
  req,
  res,
  root,
  decodedPath,
  rawPath,
  rawQuery,
  realTarget,
) {
  if (!decodedPath.endsWith('/')) {
    respond(req, res, 301, { Location: rawPath + '/' + rawQuery }, undefined);
    return;
  }
  const indexTarget = path.join(realTarget, 'index.html');
  let indexReal;
  try {
    indexReal = await realpath(indexTarget);
  } catch (err) {
    if (err.code === 'ENOENT') return send404(req, res);
    return send500(req, res);
  }
  if (!isWithinRoot(root, indexReal)) return send403(req, res);
  let indexStats;
  try {
    indexStats = await stat(indexReal);
  } catch {
    return send500(req, res);
  }
  if (!indexStats.isFile()) return send404(req, res);
  await serveFile(req, res, indexReal, '.html');
}

const STATE_SKIP_DIRS = new Set(['docs', 'templates', 'node_modules', '.git']);

const STATE_AREA_FILES = {
  'global.json': 'global',
  'tasks.json': 'tasks',
  'fixes.json': 'fixes',
  'api.json': 'arch',
  'schema.json': 'arch',
  'components.json': 'arch',
  'pricing.json': 'pricing',
  'catalog.json': 'catalog',
};

const STATE_AREA_DIRS = {
  specs: 'specs',
  fixes: 'fixes',
  context: 'context',
  memory: 'memory',
  agents: 'agents',
  skills: 'skills',
  prompts: 'prompts',
  schemas: 'schemas',
};

function stateAreaOf(rel) {
  if (rel in STATE_AREA_FILES) return STATE_AREA_FILES[rel];
  const topDir = rel.split('/', 1)[0];
  return STATE_AREA_DIRS[topDir] ?? 'meta';
}

async function collectRegistryStamps(dir, relBase, stamps) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const rel = relBase ? `${relBase}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      if (relBase === '' && STATE_SKIP_DIRS.has(entry.name)) continue;
      await collectRegistryStamps(path.join(dir, entry.name), rel, stamps);
    } else if (entry.isFile()) {
      try {
        const info = await stat(path.join(dir, entry.name));
        stamps.push(`${rel}:${info.mtimeMs}:${info.size}`);
      } catch {}
    }
  }
}

function sha1(text) {
  return createHash('sha1').update(text).digest('hex');
}

async function serveStateFingerprint(req, res, root) {
  const stamps = [];
  await collectRegistryStamps(path.join(root, 'sdd'), '', stamps);
  stamps.sort();

  const areaStamps = {};
  for (const stampLine of stamps) {
    const area = stateAreaOf(stampLine.slice(0, stampLine.indexOf(':')));
    (areaStamps[area] ??= []).push(stampLine);
  }
  const areas = Object.fromEntries(
    Object.entries(areaStamps).map(([area, lines]) => [
      area,
      sha1(lines.join('\n')),
    ]),
  );

  const body = JSON.stringify({
    fingerprint: sha1(stamps.join('\n')),
    areas,
    files: stamps.length,
  });
  return respond(
    req,
    res,
    200,
    {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Content-Length': Buffer.byteLength(body),
    },
    body,
  );
}

// ─── rtk savings (Costs → RTK tab) ───────────────────────────────────────────
// rtk keeps its numbers in a per-user SQLite db, never in the repo, so the viewer asks the
// binary on this machine: `rtk gain --project --all --format json` (summary + daily/weekly/
// monthly, scoped to this repo). Per-command detail is not in that JSON: it is read straight
// from history.db with node:sqlite when the runtime has it, else omitted. Never throws.

const RTK_CACHE_MS = 10_000;
const RTK_GAIN_TIMEOUT_MS = 8_000;
const RTK_HISTORY_LIMIT = 5_000;
let rtkCache = { at: 0, body: null };

function runRtk(binary, args, cwd) {
  return new Promise((done, fail) => {
    execFile(
      binary,
      args,
      {
        cwd,
        timeout: RTK_GAIN_TIMEOUT_MS,
        maxBuffer: 8 * 1024 * 1024,
        windowsHide: true,
        env: { ...process.env, RTK_TELEMETRY_DISABLED: '1' },
      },
      (error, stdout) => (error ? fail(error) : done(stdout)),
    );
  });
}

function rtkHistoryDbCandidates() {
  const home = homedir();
  const candidates = [];
  if (process.env.XDG_DATA_HOME) {
    candidates.push(path.join(process.env.XDG_DATA_HOME, 'rtk', 'history.db'));
  }
  candidates.push(path.join(home, '.local', 'share', 'rtk', 'history.db'));
  if (process.platform === 'darwin') {
    candidates.push(
      path.join(home, 'Library', 'Application Support', 'rtk', 'history.db'),
    );
  }
  if (process.platform === 'win32') {
    for (const base of [process.env.LOCALAPPDATA, process.env.APPDATA]) {
      if (base) {
        candidates.push(path.join(base, 'rtk', 'history.db'));
        candidates.push(path.join(base, 'rtk', 'data', 'history.db'));
      }
    }
  }
  return candidates;
}

let sqliteModule = null;
async function loadSqlite() {
  if (sqliteModule !== null) return sqliteModule || null;
  // node:sqlite is flagged experimental on 22.x and prints a warning on import; the viewer
  // has no other use for it, so the warning is silenced here and nowhere else.
  const original = process.emitWarning;
  process.emitWarning = (warning, ...rest) => {
    if (String(warning).includes('SQLite')) return;
    return original.call(process, warning, ...rest);
  };
  try {
    sqliteModule = await import('node:sqlite');
  } catch {
    sqliteModule = false;
  } finally {
    process.emitWarning = original;
  }
  return sqliteModule || null;
}

/** Raw rows for this repo (project_path == root or below), newest first. */
async function readRtkHistory(root) {
  const dbPath = rtkHistoryDbCandidates().find((candidate) => existsSync(candidate));
  if (!dbPath) return { source: 'none', rows: [] };
  const sqlite = await loadSqlite();
  if (!sqlite) return { source: 'unsupported', rows: [] };
  let db;
  try {
    db = new sqlite.DatabaseSync(dbPath, { readOnly: true });
    const rows = db
      .prepare(
        `SELECT timestamp, original_cmd, rtk_cmd, input_tokens, output_tokens, saved_tokens,
                savings_pct, exec_time_ms
           FROM commands
          WHERE project_path = ? OR project_path LIKE ?
          ORDER BY timestamp DESC
          LIMIT ?`,
      )
      .all(root, `${root}${path.sep}%`, RTK_HISTORY_LIMIT);
    return { source: 'sqlite', rows };
  } catch {
    return { source: 'error', rows: [] };
  } finally {
    try {
      db?.close();
    } catch {}
  }
}

/** "rtk git log --oneline -5" → "git log"; "rtk ls apps" → "ls". */
function commandFamily(command) {
  const words = String(command ?? '')
    .replace(/^rtk\s+/, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return '(unknown)';
  const head = words[0];
  const second = words[1];
  if (second && !second.startsWith('-') && /^[a-z]/i.test(second)) {
    return `${head} ${second}`;
  }
  return head;
}

function aggregateByCommand(rows) {
  const buckets = new Map();
  for (const row of rows) {
    const family = commandFamily(row.rtk_cmd || row.original_cmd);
    const bucket = buckets.get(family) ?? {
      command: family,
      commands: 0,
      input_tokens: 0,
      output_tokens: 0,
      saved_tokens: 0,
      total_time_ms: 0,
      last_at: null,
    };
    bucket.commands += 1;
    bucket.input_tokens += Number(row.input_tokens ?? 0);
    bucket.output_tokens += Number(row.output_tokens ?? 0);
    bucket.saved_tokens += Number(row.saved_tokens ?? 0);
    bucket.total_time_ms += Number(row.exec_time_ms ?? 0);
    if (!bucket.last_at || String(row.timestamp) > bucket.last_at) {
      bucket.last_at = String(row.timestamp);
    }
    buckets.set(family, bucket);
  }
  return [...buckets.values()]
    .map((bucket) => ({
      ...bucket,
      savings_pct:
        bucket.input_tokens > 0
          ? (bucket.saved_tokens / bucket.input_tokens) * 100
          : 0,
    }))
    .sort((a, b) => b.saved_tokens - a.saved_tokens);
}

async function collectRtkGain(root) {
  let enabled = true;
  try {
    const tools = JSON.parse(
      await readFile(path.join(root, 'sdd', 'tools.json'), 'utf8'),
    );
    enabled = tools?.rtk?.enabled !== false;
  } catch {}
  const binary = findRtkBinary();
  const payload = {
    enabled,
    binary,
    version: null,
    scope: root,
    generated_at: new Date().toISOString(),
    summary: null,
    daily: [],
    weekly: [],
    monthly: [],
    by_command: [],
    recent: [],
    history_source: 'none',
    error: null,
  };
  if (!binary) {
    payload.error = 'binary-missing';
    return payload;
  }
  payload.version = rtkBinaryVersion(binary);
  try {
    const stdout = await runRtk(
      binary,
      ['gain', '--project', '--all', '--format', 'json'],
      root,
    );
    const data = JSON.parse(stdout);
    payload.summary = data.summary ?? null;
    payload.daily = Array.isArray(data.daily) ? data.daily : [];
    payload.weekly = Array.isArray(data.weekly) ? data.weekly : [];
    payload.monthly = Array.isArray(data.monthly) ? data.monthly : [];
  } catch {
    payload.error = 'gain-failed';
  }
  const history = await readRtkHistory(root);
  payload.history_source = history.source;
  payload.by_command = aggregateByCommand(history.rows);
  payload.recent = history.rows.slice(0, 50).map((row) => ({
    at: row.timestamp,
    command: row.rtk_cmd || row.original_cmd,
    input_tokens: Number(row.input_tokens ?? 0),
    output_tokens: Number(row.output_tokens ?? 0),
    saved_tokens: Number(row.saved_tokens ?? 0),
    savings_pct: Number(row.savings_pct ?? 0),
    exec_time_ms: Number(row.exec_time_ms ?? 0),
  }));
  return payload;
}

async function serveRtkGain(req, res, root) {
  if (!rtkCache.body || Date.now() - rtkCache.at > RTK_CACHE_MS) {
    let payload;
    try {
      payload = await collectRtkGain(root);
    } catch {
      payload = { enabled: true, binary: null, error: 'unexpected', summary: null };
    }
    rtkCache = { at: Date.now(), body: JSON.stringify(payload) };
  }
  return respond(
    req,
    res,
    200,
    {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Content-Length': Buffer.byteLength(rtkCache.body),
    },
    rtkCache.body,
  );
}

async function handleRequest(req, res, root) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return send405(req, res);
  }

  const { rawPath, rawQuery } = splitUrl(req.url ?? '/');

  let decodedPath;
  try {
    decodedPath = decodeURIComponent(rawPath);
  } catch {
    return send400(req, res);
  }

  if (decodedPath.includes('\0') || decodedPath.split('/').includes('..')) {
    return send403(req, res);
  }

  const segments = decodedPath.split('/').filter(Boolean);
  if (segments.some((segment) => segment.startsWith('.'))) {
    return send403(req, res);
  }
  if (segments.length === 0) {
    return respond(
      req,
      res,
      301,
      { Location: '/sdd/docs/' + rawQuery },
      undefined,
    );
  }
  if (segments[0] !== 'sdd') {
    return send403(req, res);
  }

  if (decodedPath === '/sdd/docs/__state') {
    return serveStateFingerprint(req, res, root);
  }
  if (decodedPath === '/sdd/docs/__rtk') {
    return serveRtkGain(req, res, root);
  }

  const target = path.resolve(root, '.' + decodedPath);
  if (!isWithinRoot(root, target)) return send403(req, res);

  let realTarget;
  try {
    realTarget = await realpath(target);
  } catch (err) {
    if (err.code === 'ENOENT') return send404(req, res);
    return send500(req, res);
  }
  if (!isWithinRoot(root, realTarget)) return send403(req, res);

  let stats;
  try {
    stats = await stat(realTarget);
  } catch {
    return send500(req, res);
  }

  if (stats.isDirectory()) {
    return handleDirectory(
      req,
      res,
      root,
      decodedPath,
      rawPath,
      rawQuery,
      realTarget,
    );
  }

  if (!stats.isFile()) return send404(req, res);

  const ext = path.extname(decodedPath).toLowerCase();
  return serveFile(req, res, realTarget, ext);
}

function main() {
  const cliArgs = parseCliArgs(process.argv.slice(2));
  const root = resolveRoot(cliArgs);
  const port = resolvePort(cliArgs);

  const server = createServer((req, res) => {
    handleRequest(req, res, root).catch(() => send500(req, res));
  });

  server.listen(port, HOST, () => {
    process.stdout.write(`http://127.0.0.1:${port}/sdd/docs/\n`);
  });
}

main();
