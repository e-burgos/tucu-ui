import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InlineNotice } from '../../components/notifications/inline-notice';

describe('InlineNotice', () => {
  it('defaults to an assertive error alert with one inline message', () => {
    render(<InlineNotice messages="Boom" />);
    const el = screen.getByRole('alert');
    expect(el).toHaveTextContent('Boom');
    expect(el).toHaveAttribute('data-tucu', 'inline-notice');
    expect(el.querySelector('ul')).toBeNull();
  });

  it.each(['success', 'info', 'warning'] as const)(
    'uses role status for %s',
    (tone) => {
      render(<InlineNotice tone={tone} messages="Ok" />);
      expect(screen.getByRole('status')).toHaveAttribute('data-tone', tone);
    }
  );

  it('renders several messages as a list', () => {
    render(<InlineNotice messages={['one', 'two']} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('renders nothing when empty', () => {
    const { container } = render(<InlineNotice messages={[]} />);
    expect(container).toBeEmptyDOMElement();
    const empty = render(<InlineNotice messages="" />);
    expect(empty.container).toBeEmptyDOMElement();
  });

  it('accepts nodes and merges className', () => {
    render(<InlineNotice messages={<strong>node</strong>} className="mine" />);
    expect(screen.getByRole('alert')).toHaveClass('mine');
    expect(screen.getByText('node').tagName).toBe('STRONG');
  });
});
