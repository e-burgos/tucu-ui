/**
 * Script to fix missing imports in transformed section files.
 * Adds HeroCard and LucideIcons to the import from '../../../../index'.
 */
import fs from 'fs';
import path from 'path';

const SECTIONS_DIR = path.resolve(
  'ui/tucu-ui/src/demo/pages/components/ui-components-sections'
);

function fixImports(filePath) {
  const fileName = path.basename(filePath, '.tsx');
  let content = fs.readFileSync(filePath, 'utf-8');

  // Only process files that use HeroCard/LucideIcons in JSX but don't import them
  const hasHeroCardJSX = content.includes('<HeroCard');
  const hasLucideIconsJSX = content.includes('LucideIcons.');

  if (!hasHeroCardJSX && !hasLucideIconsJSX) return false;

  // Check what's in the import section (first 500 chars or up to first 'const')
  const importEnd = Math.min(
    content.indexOf('\nconst ') > 0 ? content.indexOf('\nconst ') : content.length,
    content.indexOf('\nfunction ') > 0 ? content.indexOf('\nfunction ') : content.length,
    1500
  );
  const importSection = content.slice(0, importEnd);

  const needsHeroCard = hasHeroCardJSX && !importSection.includes('HeroCard');
  const needsLucideIcons = hasLucideIconsJSX && !importSection.includes('LucideIcons');

  if (!needsHeroCard && !needsLucideIcons) {
    return false; // Already has imports
  }

  // Find the import from '../../../../index'
  const indexImportRegex =
    /import\s*\{([^}]+)\}\s*from\s*'\.\.\/\.\.\/\.\.\/\.\.\/index';/;
  const indexMatch = content.match(indexImportRegex);

  if (indexMatch) {
    let imports = indexMatch[1];
    const toAdd = [];
    if (needsHeroCard) toAdd.push('HeroCard');
    if (needsLucideIcons) toAdd.push('LucideIcons');

    // Add new imports after the last existing import in the block
    const lastCommaIdx = imports.lastIndexOf(',');
    if (lastCommaIdx > -1) {
      // There's already a trailing comma format, add after last item
      imports = imports.trimEnd() + '\n  ' + toAdd.join(',\n  ') + ',';
    } else {
      imports = imports.trimEnd() + ',\n  ' + toAdd.join(',\n  ') + ',';
    }

    content = content.replace(
      indexImportRegex,
      `import {\n${imports}\n} from '../../../../index';`
    );

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed imports: ${fileName} (added: ${toAdd.join(', ')})`);
    return true;
  } else {
    console.warn(`⚠️  No index import found in: ${fileName}`);
    return false;
  }
}

// ─── Main ──────────────────────────────────────────────────────

const files = fs
  .readdirSync(SECTIONS_DIR)
  .filter((f) => f.endsWith('.tsx') && f !== 'index.ts');

let fixed = 0;
for (const file of files) {
  if (fixImports(path.join(SECTIONS_DIR, file))) {
    fixed++;
  }
}

console.log(`\n🎉 Fixed ${fixed} files.`);
