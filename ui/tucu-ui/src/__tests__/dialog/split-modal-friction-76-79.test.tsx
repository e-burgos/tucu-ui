import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  within,
  act,
} from '@testing-library/react';
import React from 'react';
import {
  SplitModal,
  type SplitModalAction,
  type SplitModalSection,
} from '../../components/dialog/split-modal';
import { modalContentMaxHeight } from '../../components/dialog/modal';

afterEach(cleanup);

const navSection: SplitModalSection = {
  id: 'pages',
  label: 'Pages',
  items: [
    { id: 'overview', label: 'Overview' },
    { id: 'history', label: 'History' },
  ],
};

const optionSection = (
  extra: Partial<SplitModalSection> = {}
): SplitModalSection => ({
  id: 'theme',
  label: 'Theme',
  selectionMode: 'option',
  items: [
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' },
    { id: 'auto', label: 'Auto' },
  ],
  ...extra,
});

const renderModal = (
  props: Partial<React.ComponentProps<typeof SplitModal>> = {}
) =>
  render(
    <SplitModal isOpen title="Studio" {...props}>
      <p>body</p>
    </SplitModal>
  );

describe('SplitModal per-section selection (76)', () => {
  it('option section is a radiogroup independent from the nav', () => {
    const onNav = vi.fn();
    renderModal({
      sections: [navSection, optionSection({ defaultActiveItemId: 'dark' })],
      defaultActiveItemId: 'overview',
      onActiveItemChange: onNav,
    });
    const group = screen.getByRole('radiogroup', { name: 'Theme' });
    const radios = within(group).getAllByRole('radio');
    expect(radios.map((r) => r.getAttribute('aria-checked'))).toEqual([
      'false',
      'true',
      'false',
    ]);
    expect(screen.getByRole('button', { name: 'Overview' })).toHaveAttribute(
      'aria-current',
      'page'
    );

    fireEvent.click(screen.getByRole('radio', { name: 'Auto' }));
    expect(screen.getByRole('radio', { name: 'Auto' })).toHaveAttribute(
      'aria-checked',
      'true'
    );
    expect(screen.getByRole('radio', { name: 'Dark' })).toHaveAttribute(
      'aria-checked',
      'false'
    );
    expect(onNav).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Overview' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('selecting a nav item does not touch the option selection', () => {
    renderModal({
      sections: [navSection, optionSection({ defaultActiveItemId: 'light' })],
      defaultActiveItemId: 'overview',
    });
    fireEvent.click(screen.getByRole('button', { name: 'History' }));
    expect(screen.getByRole('button', { name: 'History' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(screen.getByRole('radio', { name: 'Light' })).toHaveAttribute(
      'aria-checked',
      'true'
    );
  });

  it('controlled option section only moves through its props and notifies', () => {
    const onChange = vi.fn();
    const { rerender } = renderModal({
      sections: [
        optionSection({ activeItemId: 'light', onActiveItemChange: onChange }),
      ],
    });
    fireEvent.click(screen.getByRole('radio', { name: 'Dark' }));
    expect(onChange).toHaveBeenCalledWith('dark');
    expect(screen.getByRole('radio', { name: 'Light' })).toHaveAttribute(
      'aria-checked',
      'true'
    );
    rerender(
      <SplitModal
        isOpen
        title="Studio"
        sections={[
          optionSection({ activeItemId: 'dark', onActiveItemChange: onChange }),
        ]}
      >
        <p>body</p>
      </SplitModal>
    );
    expect(screen.getByRole('radio', { name: 'Dark' })).toHaveAttribute(
      'aria-checked',
      'true'
    );
  });

  it('none section renders plain buttons that call onClick without active state', () => {
    const onClick = vi.fn();
    renderModal({
      sections: [
        {
          id: 'tools',
          selectionMode: 'none',
          items: [{ id: 'export', label: 'Export', onClick }],
        },
      ],
    });
    const button = screen.getByRole('button', { name: 'Export' });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(button).not.toHaveAttribute('aria-current');
    expect(button).not.toHaveAttribute('data-active');
    expect(button).not.toHaveAttribute('role');
  });

  it('roving focus stays within each section and radios select on arrow', () => {
    renderModal({
      sections: [navSection, optionSection({ defaultActiveItemId: 'light' })],
      defaultActiveItemId: 'overview',
    });
    const light = screen.getByRole('radio', { name: 'Light' });
    const radios = screen.getAllByRole('radio');
    expect(radios.map((r) => r.getAttribute('tabindex'))).toEqual([
      '0',
      '-1',
      '-1',
    ]);

    act(() => light.focus());
    fireEvent.keyDown(light, { key: 'ArrowDown' });
    expect(screen.getByRole('radio', { name: 'Dark' })).toHaveFocus();
    expect(screen.getByRole('radio', { name: 'Dark' })).toHaveAttribute(
      'aria-checked',
      'true'
    );
    fireEvent.keyDown(screen.getByRole('radio', { name: 'Dark' }), {
      key: 'End',
    });
    expect(screen.getByRole('radio', { name: 'Auto' })).toHaveFocus();
    fireEvent.keyDown(screen.getByRole('radio', { name: 'Auto' }), {
      key: 'ArrowDown',
    });
    expect(screen.getByRole('radio', { name: 'Light' })).toHaveFocus();

    const overview = screen.getByRole('button', { name: 'Overview' });
    act(() => overview.focus());
    fireEvent.keyDown(overview, { key: 'ArrowDown' });
    expect(screen.getByRole('button', { name: 'History' })).toHaveFocus();
    fireEvent.keyDown(screen.getByRole('button', { name: 'History' }), {
      key: 'ArrowDown',
    });
    expect(overview).toHaveFocus();
  });
});

describe('SplitModal sidebarActions (77)', () => {
  const actions: SplitModalAction[] = [
    {
      id: 'share',
      label: 'Share',
      icon: <svg data-testid="share-icon" />,
      onClick: vi.fn(),
    },
    { id: 'delete', label: 'Delete', variant: 'danger', onClick: vi.fn() },
    { id: 'locked', label: 'Locked', disabled: true, onClick: vi.fn() },
  ];

  it('renders labelled rows above the sidebar footer', () => {
    renderModal({ sidebarActions: actions, sidebarFooter: <p>footer</p> });
    const sidebarActions = document.querySelector(
      '[data-tucu="split-modal-sidebar-actions"]'
    );
    const footer = document.querySelector(
      '[data-tucu="split-modal-sidebar-footer"]'
    );
    expect(sidebarActions).not.toBeNull();
    expect(
      (sidebarActions as Element).compareDocumentPosition(footer as Element) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Share' }));
    expect(actions[0].onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Delete' })).toHaveAttribute(
      'data-variant',
      'danger'
    );
    expect(screen.getByRole('button', { name: 'Locked' })).toBeDisabled();
  });

  it('iconOnly keeps the label as accessible name and shows a tooltip', () => {
    renderModal({ sidebarActions: actions, sidebarActionsIconOnly: true });
    const share = screen.getByRole('button', { name: 'Share' });
    expect(share.querySelector('.sr-only')).toHaveTextContent('Share');
    fireEvent.mouseEnter(share);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Share');
  });

  it('renders the sidebar when only actions are given', () => {
    renderModal({ sidebarActions: actions });
    expect(
      document.querySelector('[data-tucu="split-modal-sidebar"]')
    ).not.toBeNull();
  });
});

describe('SplitModal item kinds (78)', () => {
  it('info items are static: no button, no focus, value rendered', () => {
    renderModal({
      sections: [
        {
          id: 'meta',
          label: 'Metadata',
          items: [
            {
              id: 'size',
              kind: 'info',
              label: 'Size',
              description: 'On disk',
              value: '4 MB',
            },
          ],
        },
      ],
    });
    expect(
      screen
        .queryAllByRole('button')
        .filter((b) => b.getAttribute('data-tucu') === 'split-modal-item')
    ).toHaveLength(0);
    expect(screen.getByText('Size')).toBeInTheDocument();
    expect(screen.getByText('On disk')).toBeInTheDocument();
    expect(screen.getByText('4 MB')).toHaveAttribute(
      'data-tucu',
      'split-modal-item-value'
    );
    expect(
      document.querySelector('[data-tucu="split-modal-item-info"]')
    ).not.toHaveAttribute('tabindex');
  });

  it('info items are skipped by keyboard roving', () => {
    renderModal({
      sections: [
        {
          id: 'main',
          items: [
            { id: 'a', label: 'Alpha' },
            { id: 'meta', kind: 'info', label: 'Meta' },
            { id: 'b', label: 'Beta' },
          ],
        },
      ],
    });
    const alpha = screen.getByRole('button', { name: 'Alpha' });
    act(() => alpha.focus());
    fireEvent.keyDown(alpha, { key: 'ArrowDown' });
    expect(screen.getByRole('button', { name: 'Beta' })).toHaveFocus();
  });

  it('action items call onClick and never become active', () => {
    const onClick = vi.fn();
    const onSelect = vi.fn();
    renderModal({
      onActiveItemChange: onSelect,
      sections: [
        {
          id: 'main',
          items: [
            { id: 'a', label: 'Alpha' },
            { id: 'run', kind: 'action', label: 'Run', onClick },
          ],
        },
      ],
    });
    fireEvent.click(screen.getByRole('button', { name: 'Run' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onSelect).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Run' })).not.toHaveAttribute(
      'aria-current'
    );
  });
});

describe('SplitModal default max height (79)', () => {
  const contentOf = () =>
    document.querySelector('[data-tucu="split-modal-layout"]')!
      .parentElement as HTMLElement;

  it('matches the Modal content max height of the same size', () => {
    renderModal();
    expect(contentOf().style.maxHeight).toBe('60vh');
    cleanup();
    renderModal({ size: 'xl' });
    expect(contentOf().style.maxHeight).toBe(modalContentMaxHeight('xl'));
    expect(modalContentMaxHeight('xl')).toBe('75vh');
  });

  it('an explicit maxHeight wins', () => {
    renderModal({ maxHeight: 320 });
    expect(contentOf().style.maxHeight).toBe('320px');
  });
});
