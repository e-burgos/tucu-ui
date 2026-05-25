import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import {
  Check,
  CheckmarkIcon,
  EyeIcon,
  EyeSlashIcon,
  InfoCircle,
  InfoIcon,
  LockIcon,
  Unlocked,
  Warning,
  Verified,
  VerifiedIcon,
  Star,
  StarFill,
} from '../../components/icons';

describe('Status Icons', () => {
  const icons = [
    { name: 'Check', Component: Check },
    { name: 'CheckmarkIcon', Component: CheckmarkIcon },
    { name: 'EyeIcon', Component: EyeIcon },
    { name: 'EyeSlashIcon', Component: EyeSlashIcon },
    { name: 'InfoCircle', Component: InfoCircle },
    { name: 'InfoIcon', Component: InfoIcon },
    { name: 'LockIcon', Component: LockIcon },
    { name: 'Unlocked', Component: Unlocked },
    { name: 'Warning', Component: Warning },
    { name: 'Verified', Component: Verified },
    { name: 'VerifiedIcon', Component: VerifiedIcon },
    { name: 'Star', Component: Star },
    { name: 'StarFill', Component: StarFill },
  ];

  icons.forEach(({ name, Component }) => {
    it(`${name} renders without crashing`, () => {
      const { container } = render(<Component />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
