'use client';

import {
  useMemo,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type JSX,
  type ReactNode,
} from 'react';
import { cn } from '../../../libs/cn';
import {
  themePresetToAttributes,
  themePresetToCssVars,
  type ThemePreset,
} from '../../presets';
import { resolvePresetReference } from '../../presets/theme-preset-registry';
import { PortalContainerContext } from './portal-container';
import { ThemeScopeContext, useThemeScope } from './theme-scope-context';
import { useDocumentColorScheme } from './use-document-color-scheme';

export interface ThemeScopeProps
  extends Omit<HTMLAttributes<HTMLElement>, 'style' | 'className' | 'children'> {
  /** Registered preset name or an inline preset. Nested scopes without a preset inherit the parent's. */
  preset?: string | ThemePreset;
  /** `auto` follows the page (`<html class="dark">`). Defaults to the preset surface, then `auto`; a nested scope without preset inherits the parent mode. */
  mode?: 'light' | 'dark' | 'auto';
  /** Extra CSS custom properties applied on top of the preset. */
  tokens?: Record<string, string>;
  className?: string;
  style?: CSSProperties;
  /** Element rendered as the scope root. */
  as?: keyof JSX.IntrinsicElements;
  children?: ReactNode;
}

const PORTAL_HOST_ATTRIBUTE = 'theme-scope-portal';

export function ThemeScope({
  preset: presetProp,
  mode: modeProp,
  tokens,
  className,
  style,
  as: tagName = 'div',
  children,
  ...rest
}: ThemeScopeProps) {
  const parentScope = useThemeScope();
  const documentColorScheme = useDocumentColorScheme();
  const [portalHost, setPortalHost] = useState<HTMLElement | null>(null);

  const ownPreset = resolvePresetReference(presetProp);
  const preset = ownPreset ?? parentScope?.preset;
  const inheritedMode = ownPreset ? undefined : parentScope?.mode;
  const requestedMode = modeProp ?? inheritedMode ?? preset?.surface ?? 'auto';
  const mode = requestedMode === 'auto' ? documentColorScheme : requestedMode;

  const cssVars = useMemo(
    () => ({
      ...(preset ? themePresetToCssVars(preset, mode) : {}),
      ...tokens,
    }),
    [preset, mode, tokens]
  );
  const scopeValue = useMemo(() => ({ preset, mode }), [preset, mode]);
  const presetAttributes = preset ? themePresetToAttributes(preset) : {};

  const ScopeElement = tagName as ElementType;

  return (
    <ThemeScopeContext.Provider value={scopeValue}>
      <PortalContainerContext.Provider value={portalHost}>
        <ScopeElement
          {...rest}
          {...presetAttributes}
          data-tucu="theme-scope"
          data-tucu-theme={preset?.name ?? 'custom'}
          data-tucu-mode={mode}
          className={cn(
            'bg-body text-foreground',
            mode === 'dark' && 'dark',
            className
          )}
          style={{ ...cssVars, ...style }}
        >
          {children}
          <div data-tucu={PORTAL_HOST_ATTRIBUTE} ref={setPortalHost} />
        </ScopeElement>
      </PortalContainerContext.Provider>
    </ThemeScopeContext.Provider>
  );
}
