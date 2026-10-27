#!/usr/bin/env node
import { cpSync, existsSync, realpathSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const SKILL_NAME = 'tucu-ui-design';
const DEFAULT_INSTALL_DIR = '.claude/skills';

export const HELP_TEXT = `tucu-ui-skill - install the ${SKILL_NAME} agent skill

Usage:
  tucu-ui-skill install [--dir <path>] [--force]
  tucu-ui-skill path
  tucu-ui-skill --help

Commands:
  install   Copy the skill into <dir>/${SKILL_NAME} (default dir: ${DEFAULT_INSTALL_DIR})
  path      Print the packaged skill directory

Options:
  --dir <path>   Target skills directory, relative to the current directory
  --force        Overwrite an existing ${SKILL_NAME} folder
  -h, --help     Show this help
`;

export interface SkillCliContext {
  cwd: string;
  packagedSkillDir: string;
  out: (message: string) => void;
  err: (message: string) => void;
}

interface InstallOptions {
  dir: string;
  force: boolean;
}

function parseInstallOptions(args: string[]): InstallOptions | string {
  const options: InstallOptions = { dir: DEFAULT_INSTALL_DIR, force: false };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === '--force') {
      options.force = true;
    } else if (arg === '--dir') {
      const value = args[index + 1];
      if (!value || value.startsWith('--')) return '--dir requires a path';
      options.dir = value;
      index += 1;
    } else {
      return `Unknown option: ${arg}`;
    }
  }
  return options;
}

function installSkill(args: string[], context: SkillCliContext): number {
  const options = parseInstallOptions(args);
  if (typeof options === 'string') {
    context.err(`${options}\n\n${HELP_TEXT}`);
    return 1;
  }
  if (!existsSync(join(context.packagedSkillDir, 'SKILL.md'))) {
    context.err(`Packaged skill not found at ${context.packagedSkillDir}`);
    return 1;
  }
  const targetDir = join(resolve(context.cwd, options.dir), SKILL_NAME);
  if (existsSync(targetDir) && !options.force) {
    context.err(`${targetDir} already exists. Re-run with --force to overwrite.`);
    return 1;
  }
  cpSync(context.packagedSkillDir, targetDir, { recursive: true, force: true });
  context.out(`Installed ${SKILL_NAME} skill to ${targetDir}`);
  return 0;
}

export function runSkillCli(argv: string[], context: SkillCliContext): number {
  const [command, ...rest] = argv;
  if (!command || command === '--help' || command === '-h' || command === 'help') {
    context.out(HELP_TEXT);
    return 0;
  }
  if (command === 'path') {
    context.out(context.packagedSkillDir);
    return 0;
  }
  if (command === 'install') return installSkill(rest, context);
  context.err(`Unknown command: ${command}\n\n${HELP_TEXT}`);
  return 1;
}

function defaultPackagedSkillDir(): string {
  return resolve(dirname(fileURLToPath(import.meta.url)), '..', 'skills', SKILL_NAME);
}

function isMainModule(): boolean {
  const entry = process.argv[1];
  return Boolean(entry) && pathToFileURL(realpathSync(entry)).href === import.meta.url;
}

if (isMainModule()) {
  process.exitCode = runSkillCli(process.argv.slice(2), {
    cwd: process.cwd(),
    packagedSkillDir: defaultPackagedSkillDir(),
    out: (message) => console.log(message),
    err: (message) => console.error(message),
  });
}
