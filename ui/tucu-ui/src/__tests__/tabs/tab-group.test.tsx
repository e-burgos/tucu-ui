import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  TabGroup,
  TabList,
  TabItem,
  TabPanels,
  TabPanel,
} from '../../components/tabs/tab';

describe('TabGroup composition', () => {
  it('renders tab items and panels', () => {
    render(
      <TabGroup>
        <TabList>
          <TabItem>Tab One</TabItem>
          <TabItem>Tab Two</TabItem>
        </TabList>
        <TabPanels>
          <TabPanel>Content One</TabPanel>
          <TabPanel>Content Two</TabPanel>
        </TabPanels>
      </TabGroup>
    );

    expect(screen.getByText('Tab One')).toBeInTheDocument();
    expect(screen.getByText('Tab Two')).toBeInTheDocument();
    expect(screen.getByText('Content One')).toBeInTheDocument();
  });

  it('renders with variant prop', () => {
    render(
      <TabGroup variant="pills">
        <TabList variant="pills">
          <TabItem variant="pills">First</TabItem>
        </TabList>
        <TabPanels>
          <TabPanel>Panel</TabPanel>
        </TabPanels>
      </TabGroup>
    );

    expect(screen.getByText('First')).toBeInTheDocument();
  });
});
