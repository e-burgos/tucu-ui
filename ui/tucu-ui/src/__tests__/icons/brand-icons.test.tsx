import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import {
  Facebook,
  Github,
  Instagram,
  Telegram,
  Twitter,
} from '../../components/icons';

describe('Brand Icons', () => {
  const icons = [
    { name: 'Facebook', Component: Facebook },
    { name: 'Github', Component: Github },
    { name: 'Instagram', Component: Instagram },
    { name: 'Telegram', Component: Telegram },
    { name: 'Twitter', Component: Twitter },
  ];

  icons.forEach(({ name, Component }) => {
    it(`${name} renders without crashing`, () => {
      const { container } = render(<Component />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
