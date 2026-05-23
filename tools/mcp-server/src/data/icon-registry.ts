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
    importPath: 'lucide-react',
    example: `import { Plus } from 'lucide-react';\n<Plus size={20} />`,
  },
  {
    name: 'Minus',
    category: 'actions',
    keywords: ['remove', 'subtract', 'decrease'],
    importPath: 'lucide-react',
    example: `import { Minus } from 'lucide-react';\n<Minus size={20} />`,
  },
  {
    name: 'X',
    category: 'actions',
    keywords: ['close', 'cancel', 'dismiss', 'remove', 'delete'],
    importPath: 'lucide-react',
    example: `import { X } from 'lucide-react';\n<X size={20} />`,
  },
  {
    name: 'Check',
    category: 'actions',
    keywords: ['confirm', 'success', 'done', 'approve', 'tick'],
    importPath: 'lucide-react',
    example: `import { Check } from 'lucide-react';\n<Check size={20} />`,
  },
  {
    name: 'Trash2',
    category: 'actions',
    keywords: ['delete', 'remove', 'discard', 'trash', 'bin'],
    importPath: 'lucide-react',
    example: `import { Trash2 } from 'lucide-react';\n<Trash2 size={20} />`,
  },
  {
    name: 'Edit',
    category: 'actions',
    keywords: ['edit', 'pencil', 'modify', 'write', 'update'],
    importPath: 'lucide-react',
    example: `import { Edit } from 'lucide-react';\n<Edit size={20} />`,
  },
  {
    name: 'Copy',
    category: 'actions',
    keywords: ['copy', 'duplicate', 'clipboard'],
    importPath: 'lucide-react',
    example: `import { Copy } from 'lucide-react';\n<Copy size={20} />`,
  },
  {
    name: 'Save',
    category: 'actions',
    keywords: ['save', 'floppy', 'persist', 'store'],
    importPath: 'lucide-react',
    example: `import { Save } from 'lucide-react';\n<Save size={20} />`,
  },
  {
    name: 'Download',
    category: 'actions',
    keywords: ['download', 'export', 'save'],
    importPath: 'lucide-react',
    example: `import { Download } from 'lucide-react';\n<Download size={20} />`,
  },
  {
    name: 'Upload',
    category: 'actions',
    keywords: ['upload', 'import', 'send'],
    importPath: 'lucide-react',
    example: `import { Upload } from 'lucide-react';\n<Upload size={20} />`,
  },
  {
    name: 'Search',
    category: 'actions',
    keywords: ['search', 'find', 'lookup', 'magnifier'],
    importPath: 'lucide-react',
    example: `import { Search } from 'lucide-react';\n<Search size={20} />`,
  },
  {
    name: 'Filter',
    category: 'actions',
    keywords: ['filter', 'funnel', 'sort', 'refine'],
    importPath: 'lucide-react',
    example: `import { Filter } from 'lucide-react';\n<Filter size={20} />`,
  },
  {
    name: 'RefreshCw',
    category: 'actions',
    keywords: ['refresh', 'reload', 'sync', 'update'],
    importPath: 'lucide-react',
    example: `import { RefreshCw } from 'lucide-react';\n<RefreshCw size={20} />`,
  },
  {
    name: 'MoreHorizontal',
    category: 'actions',
    keywords: ['more', 'menu', 'options', 'dots', 'ellipsis'],
    importPath: 'lucide-react',
    example: `import { MoreHorizontal } from 'lucide-react';\n<MoreHorizontal size={20} />`,
  },
  {
    name: 'MoreVertical',
    category: 'actions',
    keywords: ['more', 'menu', 'options', 'dots', 'vertical'],
    importPath: 'lucide-react',
    example: `import { MoreVertical } from 'lucide-react';\n<MoreVertical size={20} />`,
  },
  // ─── Navigation ───────────────────────────────────────────
  {
    name: 'ArrowLeft',
    category: 'navigation',
    keywords: ['arrow', 'left', 'back', 'previous'],
    importPath: 'lucide-react',
    example: `import { ArrowLeft } from 'lucide-react';\n<ArrowLeft size={20} />`,
  },
  {
    name: 'ArrowRight',
    category: 'navigation',
    keywords: ['arrow', 'right', 'forward', 'next'],
    importPath: 'lucide-react',
    example: `import { ArrowRight } from 'lucide-react';\n<ArrowRight size={20} />`,
  },
  {
    name: 'ArrowUp',
    category: 'navigation',
    keywords: ['arrow', 'up', 'top', 'ascend'],
    importPath: 'lucide-react',
    example: `import { ArrowUp } from 'lucide-react';\n<ArrowUp size={20} />`,
  },
  {
    name: 'ArrowDown',
    category: 'navigation',
    keywords: ['arrow', 'down', 'bottom', 'descend'],
    importPath: 'lucide-react',
    example: `import { ArrowDown } from 'lucide-react';\n<ArrowDown size={20} />`,
  },
  {
    name: 'ChevronLeft',
    category: 'navigation',
    keywords: ['chevron', 'left', 'collapse', 'previous'],
    importPath: 'lucide-react',
    example: `import { ChevronLeft } from 'lucide-react';\n<ChevronLeft size={20} />`,
  },
  {
    name: 'ChevronRight',
    category: 'navigation',
    keywords: ['chevron', 'right', 'expand', 'next'],
    importPath: 'lucide-react',
    example: `import { ChevronRight } from 'lucide-react';\n<ChevronRight size={20} />`,
  },
  {
    name: 'ChevronUp',
    category: 'navigation',
    keywords: ['chevron', 'up', 'collapse'],
    importPath: 'lucide-react',
    example: `import { ChevronUp } from 'lucide-react';\n<ChevronUp size={20} />`,
  },
  {
    name: 'ChevronDown',
    category: 'navigation',
    keywords: ['chevron', 'down', 'expand', 'dropdown'],
    importPath: 'lucide-react',
    example: `import { ChevronDown } from 'lucide-react';\n<ChevronDown size={20} />`,
  },
  {
    name: 'Home',
    category: 'navigation',
    keywords: ['home', 'house', 'main', 'dashboard'],
    importPath: 'lucide-react',
    example: `import { Home } from 'lucide-react';\n<Home size={20} />`,
  },
  {
    name: 'Menu',
    category: 'navigation',
    keywords: ['menu', 'hamburger', 'navigation', 'sidebar'],
    importPath: 'lucide-react',
    example: `import { Menu } from 'lucide-react';\n<Menu size={20} />`,
  },
  {
    name: 'ExternalLink',
    category: 'navigation',
    keywords: ['external', 'link', 'open', 'new tab'],
    importPath: 'lucide-react',
    example: `import { ExternalLink } from 'lucide-react';\n<ExternalLink size={20} />`,
  },
  // ─── Media ────────────────────────────────────────────────
  {
    name: 'Image',
    category: 'media',
    keywords: ['image', 'photo', 'picture', 'gallery'],
    importPath: 'lucide-react',
    example: `import { Image } from 'lucide-react';\n<Image size={20} />`,
  },
  {
    name: 'Video',
    category: 'media',
    keywords: ['video', 'film', 'movie', 'play'],
    importPath: 'lucide-react',
    example: `import { Video } from 'lucide-react';\n<Video size={20} />`,
  },
  {
    name: 'Music',
    category: 'media',
    keywords: ['music', 'audio', 'sound', 'song'],
    importPath: 'lucide-react',
    example: `import { Music } from 'lucide-react';\n<Music size={20} />`,
  },
  {
    name: 'Play',
    category: 'media',
    keywords: ['play', 'start', 'video', 'audio'],
    importPath: 'lucide-react',
    example: `import { Play } from 'lucide-react';\n<Play size={20} />`,
  },
  {
    name: 'Pause',
    category: 'media',
    keywords: ['pause', 'stop', 'hold'],
    importPath: 'lucide-react',
    example: `import { Pause } from 'lucide-react';\n<Pause size={20} />`,
  },
  // ─── Communication ────────────────────────────────────────
  {
    name: 'Mail',
    category: 'communication',
    keywords: ['mail', 'email', 'message', 'envelope'],
    importPath: 'lucide-react',
    example: `import { Mail } from 'lucide-react';\n<Mail size={20} />`,
  },
  {
    name: 'MessageCircle',
    category: 'communication',
    keywords: ['message', 'chat', 'comment', 'bubble'],
    importPath: 'lucide-react',
    example: `import { MessageCircle } from 'lucide-react';\n<MessageCircle size={20} />`,
  },
  {
    name: 'Phone',
    category: 'communication',
    keywords: ['phone', 'call', 'telephone', 'contact'],
    importPath: 'lucide-react',
    example: `import { Phone } from 'lucide-react';\n<Phone size={20} />`,
  },
  {
    name: 'Bell',
    category: 'communication',
    keywords: ['bell', 'notification', 'alert', 'alarm'],
    importPath: 'lucide-react',
    example: `import { Bell } from 'lucide-react';\n<Bell size={20} />`,
  },
  {
    name: 'Send',
    category: 'communication',
    keywords: ['send', 'submit', 'share', 'plane'],
    importPath: 'lucide-react',
    example: `import { Send } from 'lucide-react';\n<Send size={20} />`,
  },
  // ─── Files ────────────────────────────────────────────────
  {
    name: 'File',
    category: 'files',
    keywords: ['file', 'document', 'page'],
    importPath: 'lucide-react',
    example: `import { File } from 'lucide-react';\n<File size={20} />`,
  },
  {
    name: 'FileText',
    category: 'files',
    keywords: ['file', 'document', 'text', 'readme'],
    importPath: 'lucide-react',
    example: `import { FileText } from 'lucide-react';\n<FileText size={20} />`,
  },
  {
    name: 'Folder',
    category: 'files',
    keywords: ['folder', 'directory', 'collection'],
    importPath: 'lucide-react',
    example: `import { Folder } from 'lucide-react';\n<Folder size={20} />`,
  },
  {
    name: 'FolderOpen',
    category: 'files',
    keywords: ['folder', 'open', 'directory', 'browse'],
    importPath: 'lucide-react',
    example: `import { FolderOpen } from 'lucide-react';\n<FolderOpen size={20} />`,
  },
  // ─── Social ───────────────────────────────────────────────
  {
    name: 'Github',
    category: 'social',
    keywords: ['github', 'git', 'repository', 'code'],
    importPath: 'lucide-react',
    example: `import { Github } from 'lucide-react';\n<Github size={20} />`,
  },
  {
    name: 'Twitter',
    category: 'social',
    keywords: ['twitter', 'x', 'social', 'tweet'],
    importPath: 'lucide-react',
    example: `import { Twitter } from 'lucide-react';\n<Twitter size={20} />`,
  },
  {
    name: 'Linkedin',
    category: 'social',
    keywords: ['linkedin', 'professional', 'network', 'social'],
    importPath: 'lucide-react',
    example: `import { Linkedin } from 'lucide-react';\n<Linkedin size={20} />`,
  },
  {
    name: 'Share2',
    category: 'social',
    keywords: ['share', 'social', 'distribute', 'spread'],
    importPath: 'lucide-react',
    example: `import { Share2 } from 'lucide-react';\n<Share2 size={20} />`,
  },
  // ─── Devices ──────────────────────────────────────────────
  {
    name: 'Monitor',
    category: 'devices',
    keywords: ['monitor', 'screen', 'desktop', 'display'],
    importPath: 'lucide-react',
    example: `import { Monitor } from 'lucide-react';\n<Monitor size={20} />`,
  },
  {
    name: 'Smartphone',
    category: 'devices',
    keywords: ['phone', 'mobile', 'smartphone', 'device'],
    importPath: 'lucide-react',
    example: `import { Smartphone } from 'lucide-react';\n<Smartphone size={20} />`,
  },
  {
    name: 'Tablet',
    category: 'devices',
    keywords: ['tablet', 'ipad', 'device'],
    importPath: 'lucide-react',
    example: `import { Tablet } from 'lucide-react';\n<Tablet size={20} />`,
  },
  {
    name: 'Laptop',
    category: 'devices',
    keywords: ['laptop', 'notebook', 'computer', 'portable'],
    importPath: 'lucide-react',
    example: `import { Laptop } from 'lucide-react';\n<Laptop size={20} />`,
  },
  // ─── Status / Feedback ────────────────────────────────────
  {
    name: 'AlertCircle',
    category: 'status',
    keywords: ['alert', 'warning', 'error', 'danger', 'exclamation'],
    importPath: 'lucide-react',
    example: `import { AlertCircle } from 'lucide-react';\n<AlertCircle size={20} />`,
  },
  {
    name: 'AlertTriangle',
    category: 'status',
    keywords: ['warning', 'caution', 'alert', 'triangle'],
    importPath: 'lucide-react',
    example: `import { AlertTriangle } from 'lucide-react';\n<AlertTriangle size={20} />`,
  },
  {
    name: 'CheckCircle',
    category: 'status',
    keywords: ['success', 'check', 'done', 'complete', 'valid'],
    importPath: 'lucide-react',
    example: `import { CheckCircle } from 'lucide-react';\n<CheckCircle size={20} />`,
  },
  {
    name: 'Info',
    category: 'status',
    keywords: ['info', 'information', 'help', 'about'],
    importPath: 'lucide-react',
    example: `import { Info } from 'lucide-react';\n<Info size={20} />`,
  },
  {
    name: 'HelpCircle',
    category: 'status',
    keywords: ['help', 'question', 'support', 'faq'],
    importPath: 'lucide-react',
    example: `import { HelpCircle } from 'lucide-react';\n<HelpCircle size={20} />`,
  },
  {
    name: 'Loader2',
    category: 'status',
    keywords: ['loading', 'spinner', 'wait', 'progress'],
    importPath: 'lucide-react',
    example: `import { Loader2 } from 'lucide-react';\n<Loader2 size={20} className="animate-spin" />`,
  },
  // ─── General UI ───────────────────────────────────────────
  {
    name: 'Settings',
    category: 'general',
    keywords: ['settings', 'gear', 'config', 'preferences', 'cog'],
    importPath: 'lucide-react',
    example: `import { Settings } from 'lucide-react';\n<Settings size={20} />`,
  },
  {
    name: 'User',
    category: 'general',
    keywords: ['user', 'person', 'profile', 'account', 'avatar'],
    importPath: 'lucide-react',
    example: `import { User } from 'lucide-react';\n<User size={20} />`,
  },
  {
    name: 'Users',
    category: 'general',
    keywords: ['users', 'people', 'group', 'team'],
    importPath: 'lucide-react',
    example: `import { Users } from 'lucide-react';\n<Users size={20} />`,
  },
  {
    name: 'Lock',
    category: 'general',
    keywords: ['lock', 'security', 'password', 'protected', 'private'],
    importPath: 'lucide-react',
    example: `import { Lock } from 'lucide-react';\n<Lock size={20} />`,
  },
  {
    name: 'Unlock',
    category: 'general',
    keywords: ['unlock', 'open', 'public', 'accessible'],
    importPath: 'lucide-react',
    example: `import { Unlock } from 'lucide-react';\n<Unlock size={20} />`,
  },
  {
    name: 'Eye',
    category: 'general',
    keywords: ['eye', 'view', 'show', 'visible', 'watch'],
    importPath: 'lucide-react',
    example: `import { Eye } from 'lucide-react';\n<Eye size={20} />`,
  },
  {
    name: 'EyeOff',
    category: 'general',
    keywords: ['eye', 'hide', 'invisible', 'hidden', 'password'],
    importPath: 'lucide-react',
    example: `import { EyeOff } from 'lucide-react';\n<EyeOff size={20} />`,
  },
  {
    name: 'Calendar',
    category: 'general',
    keywords: ['calendar', 'date', 'schedule', 'event'],
    importPath: 'lucide-react',
    example: `import { Calendar } from 'lucide-react';\n<Calendar size={20} />`,
  },
  {
    name: 'Clock',
    category: 'general',
    keywords: ['clock', 'time', 'schedule', 'timer'],
    importPath: 'lucide-react',
    example: `import { Clock } from 'lucide-react';\n<Clock size={20} />`,
  },
  {
    name: 'Star',
    category: 'general',
    keywords: ['star', 'favorite', 'bookmark', 'rating'],
    importPath: 'lucide-react',
    example: `import { Star } from 'lucide-react';\n<Star size={20} />`,
  },
  {
    name: 'Heart',
    category: 'general',
    keywords: ['heart', 'like', 'love', 'favorite'],
    importPath: 'lucide-react',
    example: `import { Heart } from 'lucide-react';\n<Heart size={20} />`,
  },
  {
    name: 'Sun',
    category: 'general',
    keywords: ['sun', 'light', 'day', 'theme', 'brightness'],
    importPath: 'lucide-react',
    example: `import { Sun } from 'lucide-react';\n<Sun size={20} />`,
  },
  {
    name: 'Moon',
    category: 'general',
    keywords: ['moon', 'dark', 'night', 'theme'],
    importPath: 'lucide-react',
    example: `import { Moon } from 'lucide-react';\n<Moon size={20} />`,
  },
  // ─── Charts / Data ────────────────────────────────────────
  {
    name: 'BarChart3',
    category: 'charts',
    keywords: ['chart', 'bar', 'graph', 'analytics', 'statistics'],
    importPath: 'lucide-react',
    example: `import { BarChart3 } from 'lucide-react';\n<BarChart3 size={20} />`,
  },
  {
    name: 'LineChart',
    category: 'charts',
    keywords: ['chart', 'line', 'graph', 'trend', 'analytics'],
    importPath: 'lucide-react',
    example: `import { LineChart } from 'lucide-react';\n<LineChart size={20} />`,
  },
  {
    name: 'PieChart',
    category: 'charts',
    keywords: ['chart', 'pie', 'donut', 'graph', 'percentage'],
    importPath: 'lucide-react',
    example: `import { PieChart } from 'lucide-react';\n<PieChart size={20} />`,
  },
  {
    name: 'TrendingUp',
    category: 'charts',
    keywords: ['trending', 'up', 'growth', 'increase', 'profit'],
    importPath: 'lucide-react',
    example: `import { TrendingUp } from 'lucide-react';\n<TrendingUp size={20} />`,
  },
  {
    name: 'TrendingDown',
    category: 'charts',
    keywords: ['trending', 'down', 'decline', 'decrease', 'loss'],
    importPath: 'lucide-react',
    example: `import { TrendingDown } from 'lucide-react';\n<TrendingDown size={20} />`,
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
        icon.keywords.some((k) => k.includes(normalizedQuery) || normalizedQuery.includes(k))
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
