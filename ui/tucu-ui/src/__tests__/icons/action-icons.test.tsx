import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import {
  Copy,
  ExchangeIcon,
  ExportIcon,
  Plus,
  PlusCircle,
  Refresh,
  PowerIcon,
  ShutdownIcon,
  SwapIcon,
  LoopIcon,
} from '../../components/icons';
import UploadIcon from '../../components/icons/upload';

describe('Action Icons', () => {
  const icons = [
    { name: 'Copy', Component: Copy },
    { name: 'ExchangeIcon', Component: ExchangeIcon },
    { name: 'ExportIcon', Component: ExportIcon },
    { name: 'Plus', Component: Plus },
    { name: 'PlusCircle', Component: PlusCircle },
    { name: 'Refresh', Component: Refresh },
    { name: 'UploadIcon', Component: UploadIcon },
    { name: 'PowerIcon', Component: PowerIcon },
    { name: 'ShutdownIcon', Component: ShutdownIcon },
    { name: 'SwapIcon', Component: SwapIcon },
    { name: 'LoopIcon', Component: LoopIcon },
  ];

  icons.forEach(({ name, Component }) => {
    it(`${name} renders without crashing`, () => {
      const { container } = render(<Component />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
