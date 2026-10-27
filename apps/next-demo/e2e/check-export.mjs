import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const outDir = fileURLToPath(new URL('../out', import.meta.url));
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.txt': 'text/plain',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
};

function resolveFile(urlPath) {
  const safePath = normalize(decodeURIComponent(urlPath)).replace(
    /^(\.\.[/\\])+/,
    ''
  );
  const candidate = join(outDir, safePath);
  if (existsSync(candidate) && statSync(candidate).isDirectory()) {
    return join(candidate, 'index.html');
  }
  return candidate;
}

const server = createServer(async (request, response) => {
  const { pathname } = new URL(request.url, 'http://localhost');
  try {
    const body = await readFile(resolveFile(pathname));
    response.writeHead(200, {
      'content-type': mimeTypes[extname(pathname)] ?? 'text/html',
    });
    response.end(body);
  } catch {
    response.writeHead(404).end('not found');
  }
});

const failures = [];
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

const menuLink = (page, href) =>
  page
    .locator(`aside[data-tucu="expandable-sidebar"] a[href="${href}"]`)
    .last();

async function activeMenuHrefs(page) {
  return page
    .locator('a.bg-brand')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
}

await new Promise((resolve) => server.listen(0, resolve));
const origin = `http://localhost:${server.address().port}`;
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined,
});

try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  const runtimeErrors = [];
  page.on('pageerror', (error) => runtimeErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') runtimeErrors.push(message.text());
  });

  await page.goto(`${origin}/`);
  for (const href of ['/', '/reports/', '/settings/']) {
    await menuLink(page, href).waitFor();
  }
  expect(
    (await activeMenuHrefs(page)).join() === '/',
    'only the Dashboard menu item is active on /'
  );

  await page.evaluate(() => {
    window.__noReloadMarker = true;
  });
  await menuLink(page, '/reports/').click();
  await page.waitForURL('**/reports/');
  await page.getByText('Quarterly sales').waitFor();
  expect(
    await page.evaluate(() => window.__noReloadMarker === true),
    'client-side navigation to /reports/ did not reload the document'
  );
  const activeOnReports = await activeMenuHrefs(page);
  expect(
    activeOnReports.join() === '/reports/',
    `only Reports is active on /reports/ (got: ${JSON.stringify(
      activeOnReports
    )})`
  );

  await menuLink(page, '/settings/').click();
  await page.waitForURL('**/settings/');
  await page.getByLabel('Display name').fill('Ada');
  await page.getByLabel('Email').fill('ada@example.com');
  await page.getByLabel('Email').press('Enter');
  await page.getByTestId('saved').waitFor();

  const direct = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  await direct.goto(`${origin}/reports/`);
  await direct.getByText('Quarterly sales').waitFor();
  const activeOnDirectLoad = await activeMenuHrefs(direct);
  expect(
    activeOnDirectLoad.join() === '/reports/',
    `only Reports is active after loading /reports/ directly (got: ${JSON.stringify(
      activeOnDirectLoad
    )})`
  );
  await direct.close();

  expect(
    runtimeErrors.length === 0,
    `no console or page errors (got: ${JSON.stringify(runtimeErrors)})`
  );
} finally {
  await browser.close();
  server.close();
}

if (failures.length > 0) {
  console.error(failures.map((failure) => `FAIL ${failure}`).join('\n'));
  process.exit(1);
}
console.log('next-demo e2e: all checks passed');
