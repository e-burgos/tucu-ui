import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ParamTab, TabPanel } from '../../components/tabs/param-tab';

describe('ParamTab', () => {
  const tabMenu = [
    { title: 'General', path: 'general' },
    { title: 'Advanced', path: 'advanced' },
  ];

  it('renders tab menu items', () => {
    render(
      <MemoryRouter initialEntries={['/?view=general']}>
        <ParamTab tabMenu={tabMenu}>
          <TabPanel>General Content</TabPanel>
          <TabPanel>Advanced Content</TabPanel>
        </ParamTab>
      </MemoryRouter>
    );

    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Advanced')).toBeInTheDocument();
  });

  it('renders panel content', () => {
    render(
      <MemoryRouter initialEntries={['/?view=general']}>
        <ParamTab tabMenu={tabMenu}>
          <TabPanel>General Content</TabPanel>
          <TabPanel>Advanced Content</TabPanel>
        </ParamTab>
      </MemoryRouter>
    );

    expect(screen.getByText('General Content')).toBeInTheDocument();
  });
});
