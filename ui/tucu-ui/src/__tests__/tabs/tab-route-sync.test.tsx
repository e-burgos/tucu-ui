import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import {
  MemoryRouter,
  useLocation,
  useNavigate,
  NavigateFunction,
} from 'react-router-dom';
import { ParamTab, TabPanel } from '../../components/tabs/param-tab';
import { useTabParam } from '../../components/tabs/use-tab-param';
import {
  TabGroup,
  TabItem,
  TabList,
  TabPanels,
} from '../../components/tabs/tab';

const tabMenu = [
  { title: 'General', path: 'general' },
  { title: 'Advanced', path: 'advanced' },
  { title: 'Billing', path: 'billing' },
];

let navigateRef: NavigateFunction;
const Probe = () => {
  navigateRef = useNavigate();
  const location = useLocation();
  return <div data-testid="location">{location.pathname + location.search}</div>;
};

const renderParamTab = (url: string, props = {}) =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <ParamTab tabMenu={tabMenu} {...props}>
        <TabPanel>General Content</TabPanel>
        <TabPanel>Advanced Content</TabPanel>
        <TabPanel>Billing Content</TabPanel>
      </ParamTab>
      <Probe />
    </MemoryRouter>
  );

describe('ParamTab ↔ URL sync', () => {
  it('selects the tab from the URL on first render', () => {
    renderParamTab('/settings?view=billing');
    expect(screen.getByText('Billing Content')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Billing' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });

  it('writes the selected tab to the URL, keeping other params', () => {
    renderParamTab('/settings?view=general&q=foo');
    fireEvent.click(screen.getByRole('tab', { name: 'Advanced' }));
    expect(screen.getByText('Advanced Content')).toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent(
      '/settings?view=advanced&q=foo'
    );
  });

  it('follows external navigation, including removing the param', () => {
    renderParamTab('/settings?view=advanced');
    act(() => navigateRef('/settings?view=billing'));
    expect(screen.getByText('Billing Content')).toBeInTheDocument();
    // Previously the stale index stayed selected when the param disappeared.
    act(() => navigateRef('/settings'));
    expect(screen.getByText('General Content')).toBeInTheDocument();
  });

  it('follows browser back/forward when replace={false}', () => {
    renderParamTab('/settings?view=general', { replace: false });
    fireEvent.click(screen.getByRole('tab', { name: 'Billing' }));
    expect(screen.getByText('Billing Content')).toBeInTheDocument();
    act(() => navigateRef(-1));
    expect(screen.getByText('General Content')).toBeInTheDocument();
  });

  it('supports a custom param name, default index and onChange', () => {
    const onChange = vi.fn();
    renderParamTab('/settings', { paramName: 'tab', defaultIndex: 1, onChange });
    expect(screen.getByText('Advanced Content')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: 'Billing' }));
    expect(onChange).toHaveBeenCalledWith(2, tabMenu[2]);
    expect(screen.getByTestId('location')).toHaveTextContent('/settings?tab=billing');
  });
});

const TABS = ['sale', 'orders', 'cash'] as const;
const HookTabs = () => {
  const [tab, setTab] = useTabParam({ values: TABS, param: 'tab' });
  return (
    <TabGroup
      selectedIndex={TABS.indexOf(tab)}
      onChange={(index) => setTab(TABS[index])}
    >
      <TabList responsive={false}>
        <TabItem>Sale</TabItem>
        <TabItem>Orders</TabItem>
        <TabItem>Cash</TabItem>
      </TabList>
      <TabPanels>
        <TabPanel>Sale panel</TabPanel>
        <TabPanel>Orders panel</TabPanel>
        <TabPanel>Cash panel</TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

describe('useTabParam', () => {
  const renderHookTabs = (url: string) =>
    render(
      <MemoryRouter initialEntries={[url]}>
        <HookTabs />
        <Probe />
      </MemoryRouter>
    );

  it('falls back to the first value for missing or unknown params', () => {
    renderHookTabs('/pos?tab=nope');
    expect(screen.getByText('Sale panel')).toBeInTheDocument();
  });

  it('pushes history entries so back returns to the previous tab', () => {
    renderHookTabs('/pos');
    fireEvent.click(screen.getByRole('tab', { name: 'Orders' }));
    expect(screen.getByText('Orders panel')).toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent('/pos?tab=orders');
    fireEvent.click(screen.getByRole('tab', { name: 'Cash' }));
    act(() => navigateRef(-1));
    expect(screen.getByText('Orders panel')).toBeInTheDocument();
  });
});

describe('TabGroup isolation', () => {
  it('gives every group its own ids', () => {
    render(
      <>
        <TabGroup>
          <TabList responsive={false}>
            <TabItem>A</TabItem>
          </TabList>
        </TabGroup>
        <TabGroup>
          <TabList responsive={false}>
            <TabItem>B</TabItem>
          </TabList>
        </TabGroup>
      </>
    );
    const [a, b] = screen.getAllByRole('tab');
    expect(a.id).not.toBe(b.id);
  });
});
