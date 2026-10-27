import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync, realpathSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const SKILL_NAME = 'tucu-ui-design';
const here = dirname(fileURLToPath(import.meta.url));

export function packagedSkillDir(distDir) {
  return join(distDir, 'skills', SKILL_NAME);
}

export function copySkill({ sourceDir, targetDir }) {
  if (!existsSync(join(sourceDir, 'SKILL.md'))) {
    throw new Error(`Skill source not found: ${sourceDir}`);
  }
  rmSync(targetDir, { recursive: true, force: true });
  mkdirSync(dirname(targetDir), { recursive: true });
  cpSync(realpathSync(sourceDir), targetDir, { recursive: true, dereference: true });
}

export function writeDesignGuideReference({ targetDir, guideContent }) {
  const referencesDir = join(targetDir, 'references');
  mkdirSync(referencesDir, { recursive: true });
  writeFileSync(join(referencesDir, 'design-guide.md'), guideContent);
}

export async function buildSkills({
  sourceDir = resolve(here, '../../../harness/skills', SKILL_NAME),
  distDir = resolve(here, '../dist'),
} = {}) {
  const { getDesignGuideContent } = await import(
    pathToFileURL(join(distDir, 'resources/design-guide.js')).href
  );
  const targetDir = packagedSkillDir(distDir);
  copySkill({ sourceDir, targetDir });
  writeDesignGuideReference({ targetDir, guideContent: getDesignGuideContent() });
  return targetDir;
}

if (process.argv[1] && pathToFileURL(realpathSync(process.argv[1])).href === import.meta.url) {
  buildSkills()
    .then((dir) => console.log(`skills built: ${dir}`))
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
}
