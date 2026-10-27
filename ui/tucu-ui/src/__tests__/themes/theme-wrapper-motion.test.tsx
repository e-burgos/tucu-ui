import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MotionConfigContext } from 'framer-motion';
import { TucuNavigationContext } from '../../themes/navigation';
import type { TucuNavigation } from '../../themes/navigation';
import { useTheme } from '../../themes/hooks/use-theme';
import { ThemeWrapper } from '../../themes/components/theme-provider/theme-wrapper';

const navigation: TucuNavigation = {
  pathname: '/',
  searchParams: new URLSearchParams(),
  useParams: () => ({}),
  navigate: () => undefined,
  setSearchParams: () => undefined,
  Link: ({ to, children, className }) => (
    <a href={typeof to === 'string' ? to : to.pathname} className={className}>
      {children}
    </a>
  ),
};

let observedReducedMotion: unknown;

function ReducedMotionProbe() {
  observedReducedMotion = useContext(MotionConfigContext).reducedMotion;
  return <p>probe</p>;
}

const renderWrapper = (props: Record<string, unknown> = {}) =>
  render(
    <TucuNavigationContext.Provider value={navigation}>
      <ThemeWrapper menuItems={[]} layout="clean" {...(props as object)}>
        <ReducedMotionProbe />
      </ThemeWrapper>
    </TucuNavigationContext.Provider>
  );

describe('ThemeWrapper motion', () => {
  afterEach(() => {
    observedReducedMotion = undefined;
    window.localStorage.clear();
    useTheme.setState({ mode: 'light' });
  });

  it('defaults reducedMotion to user', () => {
    renderWrapper();
    expect(observedReducedMotion).toBe('user');
  });

  it('passes motion.reducedMotion through', () => {
    renderWrapper({ motion: { reducedMotion: 'always' } });
    expect(observedReducedMotion).toBe('always');
  });
});
