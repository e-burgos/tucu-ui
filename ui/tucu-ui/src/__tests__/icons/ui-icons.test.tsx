import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import {
  BookIcon,
  CalendarIcon,
  CompassIcon,
  DiskIcon,
  DocumentIcon,
  DotsIcon,
  FlashIcon,
  GasIcon,
  GuideIcon,
  HistoryIcon,
  Moon,
  Sun,
  MoreIcon,
  OptionIcon,
  PlayIcon,
  MediaPlayIcon,
  ProfileIcon,
  QuestionIcon,
  QuestionSolidIcon,
  TagIcon,
  Tag,
  TradingBotIcon,
  VoteIcon,
  SandClock,
  TrendArrowDownIcon,
  TrendArrowUpIcon,
  Tucu,
  IconUSFlag,
} from '../../components/icons';
import HorizontalThreeDots from '../../components/icons/horizontal-three-dots';
import VerticalThreeDots from '../../components/icons/vertical-three-dots';

describe('UI Icons', () => {
  const icons = [
    { name: 'BookIcon', Component: BookIcon },
    { name: 'CalendarIcon', Component: CalendarIcon },
    { name: 'CompassIcon', Component: CompassIcon },
    { name: 'DiskIcon', Component: DiskIcon },
    { name: 'DocumentIcon', Component: DocumentIcon },
    { name: 'DotsIcon', Component: DotsIcon },
    { name: 'FlashIcon', Component: FlashIcon },
    { name: 'GasIcon', Component: GasIcon },
    { name: 'GuideIcon', Component: GuideIcon },
    { name: 'HistoryIcon', Component: HistoryIcon },
    { name: 'HorizontalThreeDots', Component: HorizontalThreeDots },
    { name: 'VerticalThreeDots', Component: VerticalThreeDots },
    { name: 'Moon', Component: Moon },
    { name: 'Sun', Component: Sun },
    { name: 'MoreIcon', Component: MoreIcon },
    { name: 'OptionIcon', Component: OptionIcon },
    { name: 'PlayIcon', Component: PlayIcon },
    { name: 'MediaPlayIcon', Component: MediaPlayIcon },
    { name: 'ProfileIcon', Component: ProfileIcon },
    { name: 'QuestionIcon', Component: QuestionIcon },
    { name: 'QuestionSolidIcon', Component: QuestionSolidIcon },
    { name: 'TagIcon', Component: TagIcon },
    { name: 'Tag', Component: Tag },
    { name: 'TradingBotIcon', Component: TradingBotIcon },
    { name: 'VoteIcon', Component: VoteIcon },
    { name: 'SandClock', Component: SandClock },
    { name: 'TrendArrowDownIcon', Component: TrendArrowDownIcon },
    { name: 'TrendArrowUpIcon', Component: TrendArrowUpIcon },
    { name: 'Tucu', Component: Tucu },
    { name: 'IconUSFlag', Component: IconUSFlag },
  ];

  icons.forEach(({ name, Component }) => {
    it(`${name} renders without crashing`, () => {
      const { container } = render(<Component />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
