import { LAYOUT_OPTIONS } from '../../config';
import { ThemeSwitcher } from './theme-switcher';
import { ThemeVariantSwitcher } from './theme-variant-switcher';
import { DirectionSwitcher } from './direction-switcher';
import { LayoutSwitcher } from './layout-switcher';
import { DefaultColorSettings } from './default-color-settings';
import { BackgroundPicker } from './background-picker';
import { RestoreDefaults } from './restore-defaults';
import { Close, Drawer, DrawerContainer, Scrollbar } from '../../../components';
import cn from 'classnames';
import { useTheme } from '../../hooks';

export function SettingsDrawer() {
  const { isSettingsOpen, setIsSettingsOpen, layout, colorScheme } = useTheme();
  const isTahoe =
    colorScheme === 'macos-tahoe' ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE_DOCK;
  const isSonoma = colorScheme === 'macos' || layout === LAYOUT_OPTIONS.MACOS;
  const isMacOS = isTahoe || isSonoma;

  const settingsContent = (
    <div className="h-full pb-18">
      <ThemeSwitcher />
      <ThemeVariantSwitcher />
      <DirectionSwitcher />
      <LayoutSwitcher />
      <DefaultColorSettings />
      <BackgroundPicker />
      <RestoreDefaults />
    </div>
  );

  if (isTahoe) {
    return (
      <DrawerContainer
        isOpen={isSettingsOpen}
        setIsOpen={setIsSettingsOpen}
        position="right"
        backdrop={false}
        backdropClassName="backdrop-blur-[2px] bg-transparent"
      >
        <div className="pointer-events-none relative z-10 flex h-full w-full items-stretch justify-end p-3 min-[500px]:p-4">
          <aside
            data-tucu="macos-tahoe-sidebar"
            className="pointer-events-auto flex h-full w-80 max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-[30px] border border-border bg-(--macos-tahoe-sidebar-bg) backdrop-blur-[30px]"
          >
            <div className="shrink-0 px-5 pb-3 pt-5 flex items-center justify-between gap-3">
              <span className="text-[16px] font-semibold text-(--macos-tahoe-text) dark:text-white/90">
                Settings
              </span>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                aria-label="Close settings"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-black/8 text-(--macos-tahoe-text-muted) transition-colors hover:bg-black/12 hover:text-(--macos-tahoe-text) dark:bg-white/6 dark:hover:bg-white/10"
              >
                <Close className="h-3.5 w-3.5" width={14} height={14} />
              </button>
            </div>
            <Scrollbar
              style={{ height: 'calc(100dvh - 80px)' }}
              className="h-full pb-5"
            >
              {settingsContent}
            </Scrollbar>
          </aside>
        </div>
      </DrawerContainer>
    );
  }

  return (
    <Drawer
      type="sidebar"
      position="right"
      isOpen={isSettingsOpen}
      setIsOpen={setIsSettingsOpen}
      title="Settings"
      className={cn('relative', isMacOS && 'min-[500px]:w-[300px]!')}
    >
      {settingsContent}
    </Drawer>
  );
}

export default SettingsDrawer;
