import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Stepper } from '../../components/common/stepper';

describe('Stepper', () => {
  it('renders without crashing', () => {
    const steps = [
      { id: '1', label: 'Step 1' },
      { id: '2', label: 'Step 2' },
      { id: '3', label: 'Step 3' },
    ];
    const { container } = render(<Stepper steps={steps} currentStep={0} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders step labels', () => {
    const steps = [
      { id: '1', label: 'First' },
      { id: '2', label: 'Second' },
    ];
    render(<Stepper steps={steps} currentStep={1} />);
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });
});
