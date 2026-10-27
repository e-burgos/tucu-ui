export interface ThemeModeScriptOptions {
  /** localStorage key of the persisted theme store. @default 'theme-storage' */
  storageKey?: string;
  /** Mode applied when nothing valid is persisted; `'system'` follows `prefers-color-scheme`. @default 'dark' */
  defaultMode?: 'light' | 'dark' | 'system';
  /** Also apply the `macos` / `macos-tahoe` classes from the persisted colorScheme and layout. @default true */
  applyColorScheme?: boolean;
}

const DEFAULT_STORAGE_KEY = 'theme-storage';
const DEFAULT_MODE = 'dark';

const embed = (value: unknown): string =>
  JSON.stringify(value).replace(/</g, '\\u003c');

export function getThemeModeScript(
  options: ThemeModeScriptOptions = {}
): string {
  const {
    storageKey = DEFAULT_STORAGE_KEY,
    defaultMode = DEFAULT_MODE,
    applyColorScheme = true,
  } = options;

  return `(function(){try{var d=document.documentElement,s={};try{var r=localStorage.getItem(${embed(
    storageKey
  )});var p=r&&JSON.parse(r);s=(p&&p.state)||{}}catch(e){}var m=s.mode==="light"||s.mode==="dark"?s.mode:${embed(
    defaultMode
  )};if(m==="system")m=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";d.classList.toggle("dark",m==="dark");d.classList.toggle("light",m!=="dark");if(${embed(
    applyColorScheme
  )}){var c=s.colorScheme,l=s.layout;d.classList.toggle("macos",c==="macos"||l==="macos"||l==="macos-navbar");d.classList.toggle("macos-tahoe",c==="macos-tahoe"||l==="macos-tahoe"||l==="macos-tahoe-dock"||l==="macos-tahoe-navbar")}}catch(e){}})();`;
}
