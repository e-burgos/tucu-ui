import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MacOSWindow } from '../../../components/macos/sonoma/containers/window';

describe('MacOSWindow', () => {
  it('renders children', () => {
    render(<MacOSWindow>Hello Window</MacOSWindow>);
    expect(screen.getByText('Hello Window')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<MacOSWindow title="My Window">Content</MacOSWindow>);
    expect(screen.getByText('My Window')).toBeInTheDocument();
  });

  it('renders traffic lights by default', () => {
    render(<MacOSWindow>Content</MacOSWindow>);
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
    expect(screen.getByLabelText('Minimize')).toBeInTheDocument();
    expect(screen.getByLabelText('Maximize')).toBeInTheDocument();
  });

  it('hides traffic lights when showTrafficLights=false', () => {
    render(<MacOSWindow showTrafficLights={false}>Content</MacOSWindow>);
    expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(<MacOSWindow onClose={onClose}>Content</MacOSWindow>);
    fireEvent.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onMinimize when minimize button clicked', () => {
    const onMinimize = vi.fn();
    render(<MacOSWindow onMinimize={onMinimize}>Content</MacOSWindow>);
    fireEvent.click(screen.getByLabelText('Minimize'));
    expect(onMinimize).toHaveBeenCalledTimes(1);
  });

  it('calls onMaximize when maximize button clicked', () => {
    const onMaximize = vi.fn();
    render(<MacOSWindow onMaximize={onMaximize}>Content</MacOSWindow>);
    fireEvent.click(screen.getByLabelText('Maximize'));
    expect(onMaximize).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(
      <MacOSWindow className="custom-class">Content</MacOSWindow>
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
