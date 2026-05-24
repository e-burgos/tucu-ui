import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import {
  ClassicLayoutIcon,
  MinimalLayoutIcon,
  ModernLayoutIcon,
  RetroLayoutIcon,
  CompactGridIcon,
  NormalGridIcon,
  LeftAlign,
  RightAlign,
  RangeIcon,
  SpikeBarIcon,
  LevelIcon,
  LinkIcon,
  LivePricing,
  FarmIcon,
  PoolIcon,
} from '../../components/icons';

describe('Layout Icons', () => {
  const icons = [
    { name: 'ClassicLayoutIcon', Component: ClassicLayoutIcon },
    { name: 'MinimalLayoutIcon', Component: MinimalLayoutIcon },
    { name: 'ModernLayoutIcon', Component: ModernLayoutIcon },
    { name: 'RetroLayoutIcon', Component: RetroLayoutIcon },
    { name: 'CompactGridIcon', Component: CompactGridIcon },
    { name: 'NormalGridIcon', Component: NormalGridIcon },
    { name: 'LeftAlign', Component: LeftAlign },
    { name: 'RightAlign', Component: RightAlign },
    { name: 'RangeIcon', Component: RangeIcon },
    { name: 'SpikeBarIcon', Component: SpikeBarIcon },
    { name: 'LevelIcon', Component: LevelIcon },
    { name: 'LinkIcon', Component: LinkIcon },
    { name: 'LivePricing', Component: LivePricing },
    { name: 'FarmIcon', Component: FarmIcon },
    { name: 'PoolIcon', Component: PoolIcon },
  ];

  icons.forEach(({ name, Component }) => {
    it(`${name} renders without crashing`, () => {
      const { container } = render(<Component />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
