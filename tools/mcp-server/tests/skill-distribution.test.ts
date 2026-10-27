import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
// @ts-expect-error plain ESM script without type declarations
import { copySkill, writeDesignGuideReference } from '../scripts/build-skills.mjs';
import { HELP_TEXT, runSkillCli } from '../src/cli/skill';

let workDir: string;
let packagedDir: string;
let out: string[];
let err: string[];

const context = () => ({
  cwd: workDir,
  packagedSkillDir: packagedDir,
  out: (message: string) => out.push(message),
  err: (message: string) => err.push(message),
});

beforeEach(() => {
  workDir = mkdtempSync(join(tmpdir(), 'tucu-skill-'));
  packagedDir = join(workDir, 'packaged', 'tucu-ui-design');
  mkdirSync(join(packagedDir, 'references'), { recursive: true });
  writeFileSync(join(packagedDir, 'SKILL.md'), 'skill-v1');
  writeFileSync(join(packagedDir, 'references', 'checklist.md'), 'checklist');
  out = [];
  err = [];
});

afterEach(() => {
  rmSync(workDir, { recursive: true, force: true });
});

describe('build-skills', () => {
  it('copies the skill source and writes the design guide reference', () => {
    const sourceDir = join(workDir, 'source');
    mkdirSync(join(sourceDir, 'references'), { recursive: true });
    writeFileSync(join(sourceDir, 'SKILL.md'), 'source skill');
    writeFileSync(join(sourceDir, 'references', 'checklist.md'), 'source checklist');
    const targetDir = join(workDir, 'dist', 'skills', 'tucu-ui-design');

    copySkill({ sourceDir, targetDir });
    writeDesignGuideReference({ targetDir, guideContent: '# guide' });

    expect(readFileSync(join(targetDir, 'SKILL.md'), 'utf8')).toBe('source skill');
    expect(readFileSync(join(targetDir, 'references', 'checklist.md'), 'utf8')).toBe('source checklist');
    expect(readFileSync(join(targetDir, 'references', 'design-guide.md'), 'utf8')).toBe('# guide');
  });

  it('fails when the skill source has no SKILL.md', () => {
    expect(() =>
      copySkill({ sourceDir: join(workDir, 'missing'), targetDir: join(workDir, 'out') })
    ).toThrow(/Skill source not found/);
  });
});

describe('tucu-ui-skill CLI', () => {
  it('prints help without arguments and with --help', () => {
    expect(runSkillCli([], context())).toBe(0);
    expect(runSkillCli(['--help'], context())).toBe(0);
    expect(out).toEqual([HELP_TEXT, HELP_TEXT]);
    expect(HELP_TEXT).toContain('install [--dir <path>] [--force]');
  });

  it('prints the packaged skill directory', () => {
    expect(runSkillCli(['path'], context())).toBe(0);
    expect(out).toEqual([packagedDir]);
  });

  it('installs into .claude/skills by default', () => {
    expect(runSkillCli(['install'], context())).toBe(0);
    const installed = join(workDir, '.claude', 'skills', 'tucu-ui-design');
    expect(readFileSync(join(installed, 'SKILL.md'), 'utf8')).toBe('skill-v1');
    expect(existsSync(join(installed, 'references', 'checklist.md'))).toBe(true);
    expect(out[0]).toContain(installed);
  });

  it('installs into a custom --dir', () => {
    expect(runSkillCli(['install', '--dir', 'custom/skills'], context())).toBe(0);
    expect(existsSync(join(workDir, 'custom', 'skills', 'tucu-ui-design', 'SKILL.md'))).toBe(true);
  });

  it('refuses to overwrite an existing folder without --force', () => {
    runSkillCli(['install'], context());
    writeFileSync(join(packagedDir, 'SKILL.md'), 'skill-v2');
    expect(runSkillCli(['install'], context())).toBe(1);
    expect(err[0]).toContain('--force');
    expect(
      readFileSync(join(workDir, '.claude', 'skills', 'tucu-ui-design', 'SKILL.md'), 'utf8')
    ).toBe('skill-v1');
  });

  it('overwrites an existing folder with --force', () => {
    runSkillCli(['install'], context());
    writeFileSync(join(packagedDir, 'SKILL.md'), 'skill-v2');
    expect(runSkillCli(['install', '--force'], context())).toBe(0);
    expect(
      readFileSync(join(workDir, '.claude', 'skills', 'tucu-ui-design', 'SKILL.md'), 'utf8')
    ).toBe('skill-v2');
  });

  it('rejects unknown commands, unknown options and a missing --dir value', () => {
    expect(runSkillCli(['nope'], context())).toBe(1);
    expect(runSkillCli(['install', '--bogus'], context())).toBe(1);
    expect(runSkillCli(['install', '--dir'], context())).toBe(1);
  });

  it('fails when the packaged skill is missing', () => {
    const missing = { ...context(), packagedSkillDir: join(workDir, 'nowhere') };
    expect(runSkillCli(['install'], missing)).toBe(1);
    expect(err[0]).toContain('Packaged skill not found');
  });
});
