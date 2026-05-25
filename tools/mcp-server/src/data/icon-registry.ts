// ─── Icon Registry ──────────────────────────────────────────────────────────
// Provides Lucide React icon metadata for search_icons tool.

export interface IconEntry {
  name: string;
  category: string;
  keywords: string[];
  importPath: string;
  example: string;
}

export const iconRegistry: IconEntry[] = [
  // ─── Actions ──────────────────────────────────────────────
  {
    name: 'Plus',
    category: 'actions',
    keywords: ['add', 'create', 'new', 'insert'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Plus size={20} />`,
  },
  {
    name: 'Minus',
    category: 'actions',
    keywords: ['remove', 'subtract', 'decrease'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Minus size={20} />`,
  },
  {
    name: 'X',
    category: 'actions',
    keywords: ['close', 'cancel', 'dismiss', 'remove', 'delete'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.X size={20} />`,
  },
  {
    name: 'Check',
    category: 'actions',
    keywords: ['confirm', 'success', 'done', 'approve', 'tick'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Check size={20} />`,
  },
  {
    name: 'Trash2',
    category: 'actions',
    keywords: ['delete', 'remove', 'discard', 'trash', 'bin'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Trash2 size={20} />`,
  },
  {
    name: 'Edit',
    category: 'actions',
    keywords: ['edit', 'pencil', 'modify', 'write', 'update'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Edit size={20} />`,
  },
  {
    name: 'Copy',
    category: 'actions',
    keywords: ['copy', 'duplicate', 'clipboard'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Copy size={20} />`,
  },
  {
    name: 'Save',
    category: 'actions',
    keywords: ['save', 'floppy', 'persist', 'store'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Save size={20} />`,
  },
  {
    name: 'Download',
    category: 'actions',
    keywords: ['download', 'export', 'save'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Download size={20} />`,
  },
  {
    name: 'Upload',
    category: 'actions',
    keywords: ['upload', 'import', 'send'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Upload size={20} />`,
  },
  {
    name: 'Search',
    category: 'actions',
    keywords: ['search', 'find', 'lookup', 'magnifier'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Search size={20} />`,
  },
  {
    name: 'Filter',
    category: 'actions',
    keywords: ['filter', 'funnel', 'sort', 'refine'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Filter size={20} />`,
  },
  {
    name: 'RefreshCw',
    category: 'actions',
    keywords: ['refresh', 'reload', 'sync', 'update'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.RefreshCw size={20} />`,
  },
  {
    name: 'MoreHorizontal',
    category: 'actions',
    keywords: ['more', 'menu', 'options', 'dots', 'ellipsis'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.MoreHorizontal size={20} />`,
  },
  {
    name: 'MoreVertical',
    category: 'actions',
    keywords: ['more', 'menu', 'options', 'dots', 'vertical'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.MoreVertical size={20} />`,
  },
  // ─── Navigation ───────────────────────────────────────────
  {
    name: 'ArrowLeft',
    category: 'navigation',
    keywords: ['arrow', 'left', 'back', 'previous'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.ArrowLeft size={20} />`,
  },
  {
    name: 'ArrowRight',
    category: 'navigation',
    keywords: ['arrow', 'right', 'forward', 'next'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.ArrowRight size={20} />`,
  },
  {
    name: 'ArrowUp',
    category: 'navigation',
    keywords: ['arrow', 'up', 'top', 'ascend'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.ArrowUp size={20} />`,
  },
  {
    name: 'ArrowDown',
    category: 'navigation',
    keywords: ['arrow', 'down', 'bottom', 'descend'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.ArrowDown size={20} />`,
  },
  {
    name: 'ChevronLeft',
    category: 'navigation',
    keywords: ['chevron', 'left', 'collapse', 'previous'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.ChevronLeft size={20} />`,
  },
  {
    name: 'ChevronRight',
    category: 'navigation',
    keywords: ['chevron', 'right', 'expand', 'next'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.ChevronRight size={20} />`,
  },
  {
    name: 'ChevronUp',
    category: 'navigation',
    keywords: ['chevron', 'up', 'collapse'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.ChevronUp size={20} />`,
  },
  {
    name: 'ChevronDown',
    category: 'navigation',
    keywords: ['chevron', 'down', 'expand', 'dropdown'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.ChevronDown size={20} />`,
  },
  {
    name: 'Home',
    category: 'navigation',
    keywords: ['home', 'house', 'main', 'dashboard'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Home size={20} />`,
  },
  {
    name: 'Menu',
    category: 'navigation',
    keywords: ['menu', 'hamburger', 'navigation', 'sidebar'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Menu size={20} />`,
  },
  {
    name: 'ExternalLink',
    category: 'navigation',
    keywords: ['external', 'link', 'open', 'new tab'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.ExternalLink size={20} />`,
  },
  // ─── Media ────────────────────────────────────────────────
  {
    name: 'Image',
    category: 'media',
    keywords: ['image', 'photo', 'picture', 'gallery'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Image size={20} />`,
  },
  {
    name: 'Video',
    category: 'media',
    keywords: ['video', 'film', 'movie', 'play'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Video size={20} />`,
  },
  {
    name: 'Music',
    category: 'media',
    keywords: ['music', 'audio', 'sound', 'song'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Music size={20} />`,
  },
  {
    name: 'Play',
    category: 'media',
    keywords: ['play', 'start', 'video', 'audio'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Play size={20} />`,
  },
  {
    name: 'Pause',
    category: 'media',
    keywords: ['pause', 'stop', 'hold'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Pause size={20} />`,
  },
  // ─── Communication ────────────────────────────────────────
  {
    name: 'Mail',
    category: 'communication',
    keywords: ['mail', 'email', 'message', 'envelope'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Mail size={20} />`,
  },
  {
    name: 'MessageCircle',
    category: 'communication',
    keywords: ['message', 'chat', 'comment', 'bubble'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.MessageCircle size={20} />`,
  },
  {
    name: 'Phone',
    category: 'communication',
    keywords: ['phone', 'call', 'telephone', 'contact'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Phone size={20} />`,
  },
  {
    name: 'Bell',
    category: 'communication',
    keywords: ['bell', 'notification', 'alert', 'alarm'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Bell size={20} />`,
  },
  {
    name: 'Send',
    category: 'communication',
    keywords: ['send', 'submit', 'share', 'plane'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Send size={20} />`,
  },
  // ─── Files ────────────────────────────────────────────────
  {
    name: 'File',
    category: 'files',
    keywords: ['file', 'document', 'page'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.File size={20} />`,
  },
  {
    name: 'FileText',
    category: 'files',
    keywords: ['file', 'document', 'text', 'readme'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.FileText size={20} />`,
  },
  {
    name: 'Folder',
    category: 'files',
    keywords: ['folder', 'directory', 'collection'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Folder size={20} />`,
  },
  {
    name: 'FolderOpen',
    category: 'files',
    keywords: ['folder', 'open', 'directory', 'browse'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.FolderOpen size={20} />`,
  },
  // ─── Social ───────────────────────────────────────────────
  {
    name: 'Github',
    category: 'social',
    keywords: ['github', 'git', 'repository', 'code'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Github size={20} />`,
  },
  {
    name: 'Twitter',
    category: 'social',
    keywords: ['twitter', 'x', 'social', 'tweet'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Twitter size={20} />`,
  },
  {
    name: 'Linkedin',
    category: 'social',
    keywords: ['linkedin', 'professional', 'network', 'social'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Linkedin size={20} />`,
  },
  {
    name: 'Share2',
    category: 'social',
    keywords: ['share', 'social', 'distribute', 'spread'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Share2 size={20} />`,
  },
  // ─── Devices ──────────────────────────────────────────────
  {
    name: 'Monitor',
    category: 'devices',
    keywords: ['monitor', 'screen', 'desktop', 'display'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Monitor size={20} />`,
  },
  {
    name: 'Smartphone',
    category: 'devices',
    keywords: ['phone', 'mobile', 'smartphone', 'device'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Smartphone size={20} />`,
  },
  {
    name: 'Tablet',
    category: 'devices',
    keywords: ['tablet', 'ipad', 'device'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Tablet size={20} />`,
  },
  {
    name: 'Laptop',
    category: 'devices',
    keywords: ['laptop', 'notebook', 'computer', 'portable'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Laptop size={20} />`,
  },
  // ─── Status / Feedback ────────────────────────────────────
  {
    name: 'AlertCircle',
    category: 'status',
    keywords: ['alert', 'warning', 'error', 'danger', 'exclamation'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.AlertCircle size={20} />`,
  },
  {
    name: 'AlertTriangle',
    category: 'status',
    keywords: ['warning', 'caution', 'alert', 'triangle'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.AlertTriangle size={20} />`,
  },
  {
    name: 'CheckCircle',
    category: 'status',
    keywords: ['success', 'check', 'done', 'complete', 'valid'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.CheckCircle size={20} />`,
  },
  {
    name: 'Info',
    category: 'status',
    keywords: ['info', 'information', 'help', 'about'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Info size={20} />`,
  },
  {
    name: 'HelpCircle',
    category: 'status',
    keywords: ['help', 'question', 'support', 'faq'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.HelpCircle size={20} />`,
  },
  {
    name: 'Loader2',
    category: 'status',
    keywords: ['loading', 'spinner', 'wait', 'progress'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Loader2 size={20} className="animate-spin" />`,
  },
  // ─── General UI ───────────────────────────────────────────
  {
    name: 'Settings',
    category: 'general',
    keywords: ['settings', 'gear', 'config', 'preferences', 'cog'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Settings size={20} />`,
  },
  {
    name: 'User',
    category: 'general',
    keywords: ['user', 'person', 'profile', 'account', 'avatar'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.User size={20} />`,
  },
  {
    name: 'Users',
    category: 'general',
    keywords: ['users', 'people', 'group', 'team'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Users size={20} />`,
  },
  {
    name: 'Lock',
    category: 'general',
    keywords: ['lock', 'security', 'password', 'protected', 'private'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Lock size={20} />`,
  },
  {
    name: 'Unlock',
    category: 'general',
    keywords: ['unlock', 'open', 'public', 'accessible'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Unlock size={20} />`,
  },
  {
    name: 'Eye',
    category: 'general',
    keywords: ['eye', 'view', 'show', 'visible', 'watch'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Eye size={20} />`,
  },
  {
    name: 'EyeOff',
    category: 'general',
    keywords: ['eye', 'hide', 'invisible', 'hidden', 'password'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.EyeOff size={20} />`,
  },
  {
    name: 'Calendar',
    category: 'general',
    keywords: ['calendar', 'date', 'schedule', 'event'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Calendar size={20} />`,
  },
  {
    name: 'Clock',
    category: 'general',
    keywords: ['clock', 'time', 'schedule', 'timer'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Clock size={20} />`,
  },
  {
    name: 'Star',
    category: 'general',
    keywords: ['star', 'favorite', 'bookmark', 'rating'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Star size={20} />`,
  },
  {
    name: 'Heart',
    category: 'general',
    keywords: ['heart', 'like', 'love', 'favorite'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Heart size={20} />`,
  },
  {
    name: 'Sun',
    category: 'general',
    keywords: ['sun', 'light', 'day', 'theme', 'brightness'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Sun size={20} />`,
  },
  {
    name: 'Moon',
    category: 'general',
    keywords: ['moon', 'dark', 'night', 'theme'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.Moon size={20} />`,
  },
  // ─── Charts / Data ────────────────────────────────────────
  {
    name: 'BarChart3',
    category: 'charts',
    keywords: ['chart', 'bar', 'graph', 'analytics', 'statistics'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.BarChart3 size={20} />`,
  },
  {
    name: 'LineChart',
    category: 'charts',
    keywords: ['chart', 'line', 'graph', 'trend', 'analytics'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.LineChart size={20} />`,
  },
  {
    name: 'PieChart',
    category: 'charts',
    keywords: ['chart', 'pie', 'donut', 'graph', 'percentage'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.PieChart size={20} />`,
  },
  {
    name: 'TrendingUp',
    category: 'charts',
    keywords: ['trending', 'up', 'growth', 'increase', 'profit'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.TrendingUp size={20} />`,
  },
  {
    name: 'TrendingDown',
    category: 'charts',
    keywords: ['trending', 'down', 'decline', 'decrease', 'loss'],
    importPath: '@e-burgos/tucu-ui',
    example: `import { LucideIcons } from '@e-burgos/tucu-ui';\n<LucideIcons.TrendingDown size={20} />`,
  },
];

// ─── Helper functions ───────────────────────────────────────────────────────

export function getIconCategories(): string[] {
  return [...new Set(iconRegistry.map((i) => i.category))];
}

export function getIconsByCategory(category: string): IconEntry[] {
  return iconRegistry.filter(
    (i) => i.category.toLowerCase() === category.toLowerCase()
  );
}

export function searchIcons(
  query: string,
  category?: string,
  limit?: number
): IconEntry[] {
  const normalizedQuery = query.toLowerCase();
  const maxResults = limit ?? 10;

  let pool = category ? getIconsByCategory(category) : iconRegistry;

  // Score each icon by keyword relevance
  const scored = pool
    .map((icon) => {
      let score = 0;
      const nameLower = icon.name.toLowerCase();

      // Exact name match
      if (nameLower === normalizedQuery) {
        score = 100;
      }
      // Name starts with query
      else if (nameLower.startsWith(normalizedQuery)) {
        score = 80;
      }
      // Name contains query
      else if (nameLower.includes(normalizedQuery)) {
        score = 60;
      }
      // Keyword exact match
      else if (icon.keywords.includes(normalizedQuery)) {
        score = 70;
      }
      // Keyword partial match
      else if (
        icon.keywords.some(
          (k) => k.includes(normalizedQuery) || normalizedQuery.includes(k)
        )
      ) {
        score = 40;
      }

      return { icon, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);

  return scored.map((s) => s.icon);
}
