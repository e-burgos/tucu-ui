import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { Tooltip } from '../../components/common/tooltip';
import { TooltipDefaultsProvider } from '../../components/common/tooltip-defaults';
import { ThemeWrapper } from '../../themes/components/theme-provider/theme-wrapper';
import { TucuNavigationContext } from '../../themes/navigation';
import type { TucuNavigation } from '../../themes/navigation';

afterEach(cleanup);

describe('TooltipDefaultsProvider', () => {
  it('lazy default keeps closed tooltips out of the DOM', () => {
    render(
      <TooltipDefaultsProvider lazy>
        <Tooltip content="Hint">
          <button type="button">Trigger</button>
        </Tooltip>
      </TooltipDefaultsProvider>
    );
    expect(screen.queryByRole('tooltip', { hidden: true })).toBeNull();
    fireEvent.mouseEnter(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toHaveTextContent('Hint');
  });

  it('applies size and placement defaults and lets Tooltip props override them', () => {
    render(
      <TooltipDefaultsProvider size="xs" placement="bottom" arrow={false}>
        <Tooltip content="Default">
          <button type="button">One</button>
        </Tooltip>
        <Tooltip content="Override" size="md">
          <button type="button">Two</button>
        </Tooltip>
      </TooltipDefaultsProvider>
    );
    const [first, second] = screen.getAllByRole('tooltip', { hidden: true });
    expect(first).toHaveAttribute('data-size', 'xs');
    expect(second).toHaveAttribute('data-size', 'md');
  });

  it('an explicit lazy={false} wins over a lazy default', () => {
    render(
      <TooltipDefaultsProvider lazy>
        <Tooltip content="Eager" lazy={false}>
          <button type="button">Trigger</button>
        </Tooltip>
      </TooltipDefaultsProvider>
    );
    expect(screen.getByRole('tooltip', { hidden: true })).toBeInTheDocument();
  });

  it('nested providers merge, the inner one winning per key', () => {
    render(
      <TooltipDefaultsProvider size="xs" lazy>
        <TooltipDefaultsProvider size="sm">
          <Tooltip content="Nested">
            <button type="button">Trigger</button>
          </Tooltip>
        </TooltipDefaultsProvider>
      </TooltipDefaultsProvider>
    );
    fireEvent.mouseEnter(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toHaveAttribute('data-size', 'sm');
  });

  it('keeps built-in defaults without a provider', () => {
    render(
      <Tooltip content="Plain">
        <button type="button">Trigger</button>
      </Tooltip>
    );
    expect(screen.getByRole('tooltip', { hidden: true })).toHaveAttribute(
      'data-size',
      'md'
    );
  });
});

describe('ThemeWrapper tooltipDefaults', () => {
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

  it('provides the defaults to Tooltips rendered inside the shell', () => {
    render(
      <TucuNavigationContext.Provider value={navigation}>
        <ThemeWrapper
          menuItems={[]}
          tooltipDefaults={{ size: 'xs', lazy: true }}
        >
          <Tooltip content="In shell">
            <button type="button">Trigger</button>
          </Tooltip>
        </ThemeWrapper>
      </TucuNavigationContext.Provider>
    );
    const trigger = screen.getByRole('button', { name: 'Trigger' });
    expect(screen.queryByText('In shell')).toBeNull();
    fireEvent.mouseEnter(trigger);
    expect(screen.getByRole('tooltip')).toHaveAttribute('data-size', 'xs');
  });
});
