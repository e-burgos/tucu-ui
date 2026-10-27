import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import { Select } from '../../components/inputs/select';
import { Modal } from '../../components/dialog/modal';

const options = [
  { name: 'One', value: '1' },
  { name: 'Two', value: '2' },
];

describe('Select label and helper text visibility', () => {
  it('hideLabel renders an sr-only label that still names the control', () => {
    render(<Select options={options} label="Plan" hideLabel />);
    const label = screen.getByText('Plan');
    expect(label.className).toContain('sr-only');
    expect(label.className).not.toContain('mb-1.5');
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-labelledby',
      label.id
    );
  });

  it('hideLabel keeps the native label associated', () => {
    render(<Select native options={options} label="Plan" hideLabel />);
    expect(screen.getByLabelText('Plan')).toBeInTheDocument();
    expect(screen.getByText('Plan').className).toContain('sr-only');
  });

  it('hideHelperText hides visually but stays in aria-describedby', () => {
    render(<Select options={options} helperText="Pick one" hideHelperText />);
    const helper = screen.getByText('Pick one');
    expect(helper.className).toContain('sr-only');
    expect(screen.getByRole('combobox').getAttribute('aria-describedby')).toBe(
      helper.id
    );
  });

  it('shows label and helper text by default', () => {
    render(<Select options={options} label="Plan" helperText="Pick one" />);
    expect(screen.getByText('Plan').className).not.toContain('sr-only');
    expect(screen.getByText('Pick one').className).not.toContain('sr-only');
  });
});

describe('Select appearance and size', () => {
  it('neutral uses neutral tokens and the select radius token', () => {
    render(<Select options={options} appearance="neutral" />);
    const trigger = screen.getByRole('combobox');
    expect(trigger.className).toContain(
      'var(--tucu-select-radius,var(--tucu-select-radius-default))'
    );
    expect(trigger.className).toContain('var(--tucu-select-border,var(--tucu-select-border-default))');
    expect(trigger.className).toContain('var(--tucu-select-bg,var(--tucu-select-bg-default))');
    expect(trigger.className).not.toMatch(/dark:/);
    expect(trigger.className).not.toContain('rounded-xl');
  });

  it('default appearance keeps rounded-xl', () => {
    render(<Select options={options} />);
    const trigger = screen.getByRole('combobox');
    expect(trigger.className).toContain('rounded-xl');
    expect(trigger.className).not.toContain('--tucu-select-radius');
  });

  it('buttonClassName still overrides the trigger', () => {
    render(
      <Select options={options} appearance="neutral" buttonClassName="rounded-none" />
    );
    expect(screen.getByRole('combobox').className).toContain('rounded-none');
  });

  it('xs trigger is 28px tall (h-7)', () => {
    render(<Select options={options} size="xs" />);
    const trigger = screen.getByRole('combobox');
    expect(trigger.className).toContain('h-7');
    expect(trigger.className).not.toMatch(/sm:h-/);
  });
});

describe('Select Escape handling', () => {
  const openListbox = () => {
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    return trigger;
  };

  it('Escape on the trigger closes the listbox and keeps focus on the trigger', async () => {
    render(<Select options={options} />);
    const trigger = openListbox();
    trigger.focus();
    fireEvent.keyDown(trigger, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('listbox')).toBeNull());
    expect(document.activeElement).toBe(trigger);
  });

  it('Escape inside the listbox closes it and returns focus to the trigger', async () => {
    render(<Select options={options} />);
    const trigger = openListbox();
    const listbox = screen.getByRole('listbox');
    listbox.focus();
    fireEvent.keyDown(listbox, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('listbox')).toBeNull());
    expect(document.activeElement).toBe(trigger);
  });

  it('stops propagation so a parent keydown handler never sees Escape', async () => {
    const parentKeyDown = vi.fn();
    render(
      <div onKeyDown={parentKeyDown}>
        <Select options={options} />
      </div>
    );
    const trigger = openListbox();
    fireEvent.keyDown(trigger, { key: 'Escape' });
    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'Escape' });
    expect(parentKeyDown).not.toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByRole('listbox')).toBeNull());
  });

  it('inside an open Modal Escape closes only the listbox, then the modal', async () => {
    const setIsOpen = vi.fn();
    const onClose = vi.fn();
    render(
      <Modal isOpen setIsOpen={setIsOpen} onClose={onClose} hideButtons>
        <Select options={options} />
      </Modal>
    );
    const trigger = openListbox();
    trigger.focus();
    fireEvent.keyDown(trigger, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('listbox')).toBeNull());
    expect(setIsOpen).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(trigger, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('Escape inside the listbox of a Select in a Modal does not close the modal', async () => {
    const setIsOpen = vi.fn();
    render(
      <Modal isOpen setIsOpen={setIsOpen} hideButtons>
        <Select options={options} />
      </Modal>
    );
    openListbox();
    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('listbox')).toBeNull());
    expect(setIsOpen).not.toHaveBeenCalled();
  });
});
