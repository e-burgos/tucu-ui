/**
 * fix-playground-imports.mjs
 *
 * Fixes misplaced PropPlayground imports and adds missing component imports.
 */

import fs from 'fs';
import path from 'path';

const SECTIONS_DIR = 'ui/tucu-ui/src/demo/pages/components/ui-components-sections';

// Files that need PropPlayground import fixed (moved to top)
const filesNeedingPlaygroundImport = [
  'BasicTableSection.tsx',
  'CardSection.tsx',
  'CarouselSection.tsx',
  'CarouselCardsSection.tsx',
  'CarouselImageSection.tsx',
  'InfoCardSection.tsx',
  'KeyValueRowSection.tsx',
  'ListContainerSection.tsx',
  'PaginationSection.tsx',
  'ParamTabSection.tsx',
  'SidebarMenuSection.tsx',
  'SidebarSection.tsx',
  'StepperSection.tsx',
  'TabModalSection.tsx',
  'TabSection.tsx',
  'TabSelectSection.tsx',
  'ToastSection.tsx',
];

// Components that need to be added to the main import from '../../../../index'
const missingComponentImports = {
  'DefiAppLogoSection.tsx': ['TucuUiLogo'],
  'SidebarMenuSection.tsx': ['SidebarMenu'],
  'SidebarSection.tsx': ['Sidebar'],
  'ToastSection.tsx': ['NotificationCard'],
};

function fixFile(filename) {
  const filePath = path.join(SECTIONS_DIR, filename);
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  // 1. Remove misplaced PropPlayground import (not at top)
  const lines = content.split('\n');
  const playgroundImportLine = "import { PropPlayground } from '../../../components/prop-playground';";

  // Find all occurrences of the import line
  const importIndices = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === playgroundImportLine.trim()) {
      importIndices.push(i);
    }
  }

  // If found anywhere, remove all occurrences first
  if (importIndices.length > 0) {
    for (let i = importIndices.length - 1; i >= 0; i--) {
      lines.splice(importIndices[i], 1);
    }
    modified = true;
  }

  // 2. Add PropPlayground import at the right place (after last real import at top)
  // Real imports are at the top, before any blank line followed by non-import code
  let lastTopImportIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // Check if this line is part of an import block at the top
    if (line.startsWith('import ') || line.startsWith('} from ') || 
        line === '' || line.startsWith('//') ||
        (line && !line.startsWith('import') && !line.startsWith('const') && !line.startsWith('export') && !line.startsWith('function') && !line.startsWith('//') && i < 30)) {
      // Check if it's actually an import continuation (e.g. multiline import)
      if (line.startsWith('import ') || line.endsWith("from '../../../../index';") || 
          line.endsWith("from '../../../components/prop-playground';") ||
          line.endsWith("from '../../../components/auto-props-table';") ||
          line.includes("from 'lucide-react'") ||
          line.includes("from 'react'")) {
        lastTopImportIdx = i;
      }
    }
    // Stop scanning once we hit actual component code
    if (i > 5 && (line.startsWith('const ') || line.startsWith('function ') || line.startsWith('export '))) {
      break;
    }
  }

  // Simpler approach: find the first blank line after imports at top
  let insertIdx = 0;
  let inImportBlock = true;
  for (let i = 0; i < Math.min(lines.length, 40); i++) {
    const line = lines[i].trim();
    if (inImportBlock) {
      if (line.startsWith('import ') || line.startsWith('}') && line.includes('from') ||
          line.includes("} from '") || line === '' && i < 3) {
        insertIdx = i + 1;
      } else if (line === '' && i > 2) {
        // Blank line after imports — this is our insertion point
        insertIdx = i;
        break;
      } else if (!line.startsWith('import') && line !== '' && !line.startsWith('//') && 
                 !line.startsWith('{') && !line.startsWith('}') && 
                 !line.includes("from '")) {
        // Not an import line, we've passed the imports
        insertIdx = i;
        break;
      }
    }
  }

  // Actually let's use a more reliable approach:
  // Find the line AFTER the closing of the main import from '../../../../index' or the last import-like statement
  content = lines.join('\n');
  
  // Find all import statements at the top (before component function)
  const topImportRegex = /^import\s[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm;
  let lastMatch = null;
  let m;
  // Only search in the first 1500 chars to avoid matching code examples
  const topPortion = content.substring(0, 1500);
  while ((m = topImportRegex.exec(topPortion)) !== null) {
    lastMatch = m;
  }

  if (lastMatch && !content.includes(playgroundImportLine)) {
    const insertPos = lastMatch.index + lastMatch[0].length;
    content = content.slice(0, insertPos) + '\n' + playgroundImportLine + content.slice(insertPos);
    modified = true;
  }

  // 3. Add missing component imports to the main index import
  if (missingComponentImports[filename]) {
    for (const comp of missingComponentImports[filename]) {
      if (!content.includes(comp)) {
        // Add component to the import from '../../../../index'
        const indexImportRegex = /} from '\.\.\/\.\.\/\.\.\/\.\.\/index';/;
        const indexMatch = content.match(indexImportRegex);
        if (indexMatch) {
          content = content.replace(
            indexImportRegex,
            `  ${comp},\n} from '../../../../index';`
          );
          modified = true;
        }
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  ✅ Fixed: ${filename}`);
  } else {
    console.log(`  ⏭️  No fix needed: ${filename}`);
  }
}

console.log('🔧 Fixing PropPlayground imports...\n');

const allFiles = [...new Set([...filesNeedingPlaygroundImport, ...Object.keys(missingComponentImports)])];
for (const f of allFiles) {
  fixFile(f);
}

console.log('\n✅ Done');
