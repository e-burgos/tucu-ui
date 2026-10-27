import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor, act } from '@testing-library/react';
import React from 'react';

import {
  SplitModalWizard,
  type SplitModalWizardStep,
} from '../../components/dialog/split-modal-wizard';
import { useTheme } from '../../themes/hooks/use-theme';

afterEach(() => {
  cleanup();
  useTheme.setState({ lang: 'en' });
});

type StepId = 'a' | 'b' | 'c' | 'd';

const steps: SplitModalWizardStep<StepId>[] = [
  { id: 'a', title: 'Alpha', content: <p>content-a</p>, hint: 'hint-a', heading: 'Alpha heading' },
  { id: 'b', title: 'Beta', content: <p>content-b</p> },
  { id: 'c', title: 'Gamma', content: <p>content-c</p> },
  { id: 'd', title: 'Delta', content: <p>content-d</p> },
];

interface HarnessProps {
  initial?: StepId;
  validateStep?: (id: StepId) => boolean | Promise<boolean>;
  onStepChange?: (id: StepId) => void;
  extra?: Partial<React.ComponentProps<typeof SplitModalWizard<StepId>>>;
}

function Harness({ initial = 'a', validateStep, onStepChange, extra }: HarnessProps) {
  const [active, setActive] = React.useState<StepId>(initial);
  return (
    <SplitModalWizard<StepId>
      isOpen
      title="Wizard"
      steps={steps}
      activeStepId={active}
      onStepChange={(id) => {
        onStepChange?.(id);
        setActive(id);
      }}
      validateStep={validateStep}
      {...extra}
    />
  );
}

const stepButton = (name: string) => screen.getByRole('button', { name: new RegExp(name) });
const next = () => screen.getByRole('button', { name: 'Next' });

describe('SplitModalWizard', () => {
  it('lists steps, shows the active content, heading, hint and progress', () => {
    render(<Harness />);
    expect(screen.getByRole('navigation', { name: 'Steps' })).toBeInTheDocument();
    expect(stepButton('Alpha')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('content-a')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Alpha heading' })).toBeInTheDocument();
    expect(screen.getByText('hint-a')).toBeInTheDocument();
    expect(screen.getByText('Step 1 of 4')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1');
  });

  it('hides progress with showProgress=false', () => {
    render(<Harness extra={{ showProgress: false }} />);
    expect(screen.queryByText('Step 1 of 4')).toBeNull();
    expect(screen.queryByRole('progressbar')).toBeNull();
  });

  it('localizes the step counter and buttons in es', () => {
    useTheme.setState({ lang: 'es' });
    render(<Harness extra={{ onCancel: vi.fn() }} />);
    expect(screen.getByText('Paso 1 de 4')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Anterior' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Siguiente' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Pasos' })).toBeInTheDocument();
  });

  it('label props override the localized defaults', () => {
    render(
      <Harness
        extra={{ previousLabel: 'Back', nextLabel: 'Go', cancelLabel: 'Abort', onCancel: vi.fn() }}
      />
    );
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Abort' })).toBeInTheDocument();
  });

  it('cancel button only exists with onCancel and calls it', () => {
    const onCancel = vi.fn();
    const { rerender } = render(<Harness />);
    expect(screen.queryByRole('button', { name: 'Cancel' })).toBeNull();
    rerender(<Harness extra={{ onCancel }} />);
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('next validates the current step and advances when valid', async () => {
    const validateStep = vi.fn().mockResolvedValue(true);
    const onStepChange = vi.fn();
    render(<Harness validateStep={validateStep} onStepChange={onStepChange} />);
    fireEvent.click(next());
    await waitFor(() => expect(onStepChange).toHaveBeenCalledWith('b'));
    expect(validateStep).toHaveBeenCalledWith('a');
    expect(screen.getByText('content-b')).toBeInTheDocument();
    expect(stepButton('Alpha')).toHaveTextContent('completed');
  });

  it('forward jump validates each intervening step sequentially and stops at the first invalid one', async () => {
    const order: string[] = [];
    const validateStep = vi.fn(async (id: StepId) => {
      order.push(id);
      await Promise.resolve();
      return id !== 'b';
    });
    const onStepChange = vi.fn();
    render(<Harness validateStep={validateStep} onStepChange={onStepChange} />);
    fireEvent.click(stepButton('Delta'));
    await waitFor(() => expect(onStepChange).toHaveBeenCalledWith('b'));
    expect(order).toEqual(['a', 'b']);
    expect(onStepChange).toHaveBeenCalledTimes(1);
    expect(screen.getByText('content-b')).toBeInTheDocument();
    expect(stepButton('Beta')).toHaveTextContent('needs attention');
    expect(stepButton('Alpha')).toHaveTextContent('completed');
    expect(stepButton('Gamma')).not.toHaveTextContent('completed');
  });

  it('an invalid current step stays put and is marked as error', async () => {
    const validateStep = vi.fn().mockResolvedValue(false);
    const onStepChange = vi.fn();
    render(<Harness validateStep={validateStep} onStepChange={onStepChange} />);
    fireEvent.click(next());
    await waitFor(() => expect(stepButton('Alpha')).toHaveTextContent('needs attention'));
    expect(onStepChange).not.toHaveBeenCalled();
    expect(screen.getByText('content-a')).toBeInTheDocument();
  });

  it('error is cleared once the step validates', async () => {
    let allow = false;
    const validateStep = vi.fn(async () => allow);
    render(<Harness validateStep={validateStep} />);
    fireEvent.click(next());
    await waitFor(() => expect(stepButton('Alpha')).toHaveTextContent('needs attention'));
    allow = true;
    fireEvent.click(next());
    await waitFor(() => expect(screen.getByText('content-b')).toBeInTheDocument());
    expect(stepButton('Alpha')).not.toHaveTextContent('needs attention');
    expect(stepButton('Alpha')).toHaveTextContent('completed');
  });

  it('cancels a stale async navigation when a newer one starts', async () => {
    const resolvers: Record<string, (value: boolean) => void> = {};
    const validateStep = vi.fn(
      (id: StepId) =>
        new Promise<boolean>((resolve) => {
          resolvers[`${id}-${validateStep.mock.calls.length}`] = resolve;
        })
    );
    const onStepChange = vi.fn();
    render(<Harness validateStep={validateStep} onStepChange={onStepChange} />);
    fireEvent.click(stepButton('Gamma'));
    fireEvent.click(stepButton('Beta'));
    expect(validateStep).toHaveBeenCalledTimes(2);
    await act(async () => {
      resolvers['a-2'](true);
      await Promise.resolve();
    });
    await waitFor(() => expect(onStepChange).toHaveBeenCalledWith('b'));
    await act(async () => {
      resolvers['a-1'](true);
      await Promise.resolve();
    });
    expect(onStepChange).toHaveBeenCalledTimes(1);
    expect(onStepChange).not.toHaveBeenCalledWith('c');
  });

  it('backward navigation never validates', () => {
    const validateStep = vi.fn().mockResolvedValue(false);
    const onStepChange = vi.fn();
    render(<Harness initial="c" validateStep={validateStep} onStepChange={onStepChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(onStepChange).toHaveBeenCalledWith('b');
    fireEvent.click(stepButton('Alpha'));
    expect(onStepChange).toHaveBeenCalledWith('a');
    expect(validateStep).not.toHaveBeenCalled();
  });

  it('shows primaryAction only on the last step by default and replaces next', () => {
    const primary = <button type="button">Finish</button>;
    const { rerender } = render(<Harness extra={{ primaryAction: primary }} />);
    expect(screen.queryByRole('button', { name: 'Finish' })).toBeNull();
    expect(next()).toBeInTheDocument();
    rerender(<Harness initial="d" extra={{ primaryAction: primary }} />);
  });

  it('last step shows primaryAction and no next button', () => {
    render(<Harness initial="d" extra={{ primaryAction: <button type="button">Finish</button> }} />);
    expect(screen.getByRole('button', { name: 'Finish' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Next' })).toBeNull();
  });

  it('primaryAlwaysVisible keeps both primaryAction and next', () => {
    render(
      <Harness
        extra={{ primaryAction: <button type="button">Save</button>, primaryAlwaysVisible: true }}
      />
    );
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(next()).toBeInTheDocument();
  });

  it('disabled steps are skipped by next and cannot be selected', async () => {
    const onStepChange = vi.fn();
    const disabledSteps = steps.map((s) => (s.id === 'b' ? { ...s, disabled: true } : s));
    render(
      <SplitModalWizard<StepId>
        isOpen
        title="Wizard"
        steps={disabledSteps}
        activeStepId="a"
        onStepChange={onStepChange}
      />
    );
    expect(stepButton('Beta')).toBeDisabled();
    fireEvent.click(next());
    await waitFor(() => expect(onStepChange).toHaveBeenCalledWith('c'));
  });

  it('renders subtitle and sidebarAside', () => {
    render(<Harness extra={{ subtitle: 'sub-text', sidebarAside: <span>aside-x</span> }} />);
    expect(screen.getByText('sub-text')).toBeInTheDocument();
    expect(screen.getByText('aside-x')).toBeInTheDocument();
  });
});
