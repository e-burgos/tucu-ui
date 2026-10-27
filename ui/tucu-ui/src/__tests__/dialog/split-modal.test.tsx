import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';

import {
  SplitModal,
  type SplitModalSection,
} from '../../components/dialog/split-modal';
import { useTheme } from '../../themes/hooks/use-theme';

afterEach(() => {
  cleanup();
  useTheme.setState({ lang: 'en' });
});

const sections: SplitModalSection[] = [
  {
    id: 'main',
    label: 'Main',
    items: [
      { id: 'overview', label: 'Overview' },
      { id: 'gates', label: 'Gates', status: 'warning', badge: '3' },
      { id: 'locked', label: 'Locked', disabled: true },
      { id: 'history', label: 'History', status: 'success', description: 'Past runs' },
    ],
  },
];

const renderModal = (props: Partial<React.ComponentProps<typeof SplitModal>> = {}) =>
  render(
    <SplitModal isOpen title="Studio" sections={sections} {...props}>
      <p>body content</p>
    </SplitModal>
  );

const item = (name: string) => screen.getByRole('button', { name: new RegExp(name) });

describe('SplitModal dialog', () => {
  it('renders a dialog labelled by the title only, with chips and actions in the header', () => {
    renderModal({
      chips: <span>chip-a</span>,
      headerActions: <button type="button">Export</button>,
    });
    const dialog = screen.getByRole('dialog', { name: 'Studio' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByText('chip-a')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Export' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Studio' })).toBeInTheDocument();
  });

  it('aria-label wins over title and data-* reach the dialog', () => {
    renderModal({ 'aria-label': 'Custom', 'data-testid': 'split' });
    const dialog = screen.getByRole('dialog', { name: 'Custom' });
    expect(dialog).toBe(screen.getByTestId('split'));
    expect(dialog).not.toHaveAttribute('aria-labelledby');
  });

  it('renders nothing when closed', () => {
    renderModal({ isOpen: false });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('closes through the close button, Escape and mirrors setIsOpen', () => {
    const onClose = vi.fn();
    const setIsOpen = vi.fn();
    renderModal({ onClose, setIsOpen });
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(setIsOpen).toHaveBeenCalledWith(false);
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('uses the localized close label', () => {
    useTheme.setState({ lang: 'es' });
    renderModal();
    expect(screen.getByRole('button', { name: 'Cerrar' })).toBeInTheDocument();
  });

  it('renders the body, footer and merges classNames last', () => {
    renderModal({
      footer: <button type="button">Save</button>,
      className: 'panel-x',
      bodyClassName: 'body-x',
      sidebarClassName: 'side-x',
      overlayClassName: 'overlay-x',
    });
    expect(screen.getByText('body content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(document.querySelector('[data-tucu="modal"]')).toHaveClass('panel-x');
    expect(document.querySelector('[data-tucu="split-modal-body"]')).toHaveClass('body-x');
    expect(document.querySelector('[data-tucu="split-modal-sidebar"]')).toHaveClass('side-x');
    expect(document.querySelector('[data-tucu="modal-overlay"]')).toHaveClass('overlay-x');
  });

  it('applies the default max width and honours maxWidth, sidebarWidth and sidebarPosition', () => {
    const { rerender } = renderModal();
    expect(document.querySelector('[data-tucu="modal"]')).toHaveStyle({ maxWidth: '56rem' });
    rerender(
      <SplitModal
        isOpen
        title="Studio"
        sections={sections}
        maxWidth={640}
        sidebarWidth={300}
        sidebarPosition="end"
      >
        x
      </SplitModal>
    );
    expect(document.querySelector('[data-tucu="modal"]')).toHaveStyle({ maxWidth: '640px' });
    const layout = document.querySelector('[data-tucu="split-modal-layout"]') as HTMLElement;
    expect(layout.style.getPropertyValue('--tucu-split-modal-sidebar-width')).toBe('300px');
    expect(layout).toHaveClass('md:flex-row-reverse');
    expect(document.querySelector('[data-tucu="split-modal-sidebar"]')).toHaveClass('md:border-l');
  });

  it('focuses initialFocusRef when opened', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <SplitModal isOpen title="Studio" initialFocusRef={ref}>
        <button ref={ref} type="button">
          first
        </button>
      </SplitModal>
    );
    expect(ref.current).toHaveFocus();
  });
});

describe('SplitModal navigation', () => {
  it('renders a labelled nav with the active item marked aria-current', () => {
    renderModal({ defaultActiveItemId: 'gates' });
    expect(screen.getByRole('navigation', { name: 'Navigation' })).toBeInTheDocument();
    expect(item('Gates')).toHaveAttribute('aria-current', 'page');
    expect(item('Overview')).not.toHaveAttribute('aria-current');
  });

  it('uses the localized nav label and a custom one', () => {
    useTheme.setState({ lang: 'es' });
    const { rerender } = renderModal();
    expect(screen.getByRole('navigation', { name: 'Navegación' })).toBeInTheDocument();
    rerender(
      <SplitModal isOpen title="Studio" sections={sections} navigationLabel="Gates nav">
        x
      </SplitModal>
    );
    expect(screen.getByRole('navigation', { name: 'Gates nav' })).toBeInTheDocument();
  });

  it('uncontrolled: clicking changes the active item and notifies', () => {
    const onActiveItemChange = vi.fn();
    renderModal({ defaultActiveItemId: 'overview', onActiveItemChange });
    fireEvent.click(item('History'));
    expect(onActiveItemChange).toHaveBeenCalledWith('history');
    expect(item('History')).toHaveAttribute('aria-current', 'page');
    expect(item('Overview')).not.toHaveAttribute('aria-current');
  });

  it('controlled: only the prop moves the active item', () => {
    const onActiveItemChange = vi.fn();
    const { rerender } = renderModal({ activeItemId: 'overview', onActiveItemChange });
    fireEvent.click(item('History'));
    expect(onActiveItemChange).toHaveBeenCalledWith('history');
    expect(item('Overview')).toHaveAttribute('aria-current', 'page');
    rerender(
      <SplitModal
        isOpen
        title="Studio"
        sections={sections}
        activeItemId="history"
        onActiveItemChange={onActiveItemChange}
      >
        x
      </SplitModal>
    );
    expect(item('History')).toHaveAttribute('aria-current', 'page');
  });

  it('disabled items are real disabled buttons and cannot be selected', () => {
    const onActiveItemChange = vi.fn();
    renderModal({ onActiveItemChange });
    const locked = item('Locked');
    expect(locked).toBeDisabled();
    fireEvent.click(locked);
    expect(onActiveItemChange).not.toHaveBeenCalled();
  });

  it('roving focus: arrows, Home and End skip disabled items and wrap', () => {
    renderModal({ defaultActiveItemId: 'overview' });
    const overview = item('Overview');
    expect(overview).toHaveAttribute('tabindex', '0');
    expect(item('Gates')).toHaveAttribute('tabindex', '-1');
    overview.focus();
    const nav = screen.getByRole('navigation');
    fireEvent.keyDown(nav, { key: 'ArrowDown' });
    expect(item('Gates')).toHaveFocus();
    fireEvent.keyDown(nav, { key: 'ArrowDown' });
    expect(item('History')).toHaveFocus();
    fireEvent.keyDown(nav, { key: 'ArrowDown' });
    expect(item('Overview')).toHaveFocus();
    fireEvent.keyDown(nav, { key: 'ArrowUp' });
    expect(item('History')).toHaveFocus();
    fireEvent.keyDown(nav, { key: 'Home' });
    expect(item('Overview')).toHaveFocus();
    fireEvent.keyDown(nav, { key: 'End' });
    expect(item('History')).toHaveFocus();
    expect(item('History')).toHaveAttribute('tabindex', '0');
    expect(item('Overview')).toHaveAttribute('tabindex', '-1');
  });

  it('status renders a dot with localized sr-only text, and the badge', () => {
    renderModal();
    const gates = item('Gates');
    expect(gates).toHaveTextContent('Warning');
    expect(gates.querySelector('.sr-only')).toHaveTextContent('Warning');
    expect(gates.querySelector('[data-status="warning"] [aria-hidden="true"]')).not.toBeNull();
    expect(gates).toHaveTextContent('3');
    expect(item('History')).toHaveTextContent('Success');
    expect(item('History')).toHaveTextContent('Past runs');
  });

  it('status text is localized in es', () => {
    useTheme.setState({ lang: 'es' });
    renderModal();
    expect(item('Gates')).toHaveTextContent('Advertencia');
  });

  it('renders section labels as list names', () => {
    renderModal();
    expect(screen.getByRole('list', { name: 'Main' })).toBeInTheDocument();
  });
});

describe('SplitModal sidebar slots and mobile markup', () => {
  it('renders sidebarHeader, sidebar and sidebarFooter with mobile ordering classes', () => {
    renderModal({
      sidebarHeader: <span>side-head</span>,
      sidebar: <span>side-free</span>,
      sidebarFooter: <span>side-foot</span>,
    });
    expect(screen.getByText('side-head')).toBeInTheDocument();
    expect(screen.getByText('side-free')).toBeInTheDocument();
    const sidebar = document.querySelector('[data-tucu="split-modal-sidebar"]') as HTMLElement;
    expect(sidebar).toHaveClass('contents', 'md:flex', 'md:flex-col');
    expect(document.querySelector('[data-tucu="split-modal-sidebar-footer"]')).toHaveClass(
      'order-4',
      'md:order-none'
    );
    expect(document.querySelector('[data-tucu="split-modal-main"]')).toHaveClass('order-3');
  });

  it('the nav is a horizontally scrollable row below md and a column from md', () => {
    renderModal();
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('flex-row', 'overflow-x-auto', 'md:flex-col');
    expect(document.querySelector('[data-tucu="split-modal-layout"]')).toHaveClass(
      'flex-col',
      'md:flex-row'
    );
  });

  it('works without a sidebar', () => {
    render(
      <SplitModal isOpen title="Plain">
        body
      </SplitModal>
    );
    expect(document.querySelector('[data-tucu="split-modal-sidebar"]')).toBeNull();
    expect(screen.queryByRole('navigation')).toBeNull();
  });
});
