'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '../../libs/cn';
import { useTucuMessages } from '../../libs/i18n/use-tucu-messages';
import { Button } from '../buttons/button';
import { Input } from '../inputs/input';
import { Select, type SelectOption } from '../inputs/select';
import { Switch } from '../inputs/switch';

export interface FilterBarSearch {
  /** Current search text. */
  value: string;
  /** Called with the new search text. */
  onChange: (value: string) => void;
  /** Placeholder of the search input. Defaults to the translated "Search...". */
  placeholder?: string;
}

export interface FilterBarSelectFilter {
  /** Stable id of the filter. */
  id: string;
  /** Label rendered above the select. */
  label?: ReactNode;
  /** Selected option value; an empty string means "no filter". */
  value: string;
  /** Called with the picked option value. */
  onChange: (value: string) => void;
  /** Options of the select. */
  options: SelectOption[];
  /** Extra classes merged onto the select wrapper. */
  className?: string;
  /** Do not count this filter as active when computing the active count. */
  ignoreInActiveCount?: boolean;
}

export interface FilterBarToggle {
  /** Switch state. */
  checked: boolean;
  /** Called with the new switch state. */
  onChange: (checked: boolean) => void;
  /** Switch label. */
  label: ReactNode;
}

export interface FilterBarProps {
  /** Search input configuration. */
  search?: FilterBarSearch;
  /** Select filters rendered with the tucu Select. */
  filters?: FilterBarSelectFilter[];
  /** Row of FilterPills. */
  pills?: ReactNode;
  /** Trailing actions (buttons, menus). */
  actions?: ReactNode;
  /** Boolean toggle rendered with the tucu Switch. */
  toggle?: FilterBarToggle;
  /** Called by the clear button; the button is only shown while something is active. */
  onClear?: () => void;
  /** Overrides the computed number of active filters. */
  activeCount?: number;
  /** On small screens, collapse the filters behind a button showing the active count. */
  collapsible?: boolean;
  /** Extra content rendered after the filters. */
  children?: ReactNode;
  /** Extra classes merged onto the root element. */
  className?: string;
}

function countActiveFilters({
  search,
  filters,
  toggle,
}: Pick<FilterBarProps, 'search' | 'filters' | 'toggle'>) {
  const searchActive = search?.value.trim() ? 1 : 0;
  const selectsActive = (filters ?? []).filter(
    (filter) => filter.value !== '' && !filter.ignoreInActiveCount
  ).length;
  return searchActive + selectsActive + (toggle?.checked ? 1 : 0);
}

export function FilterBar({
  search,
  filters,
  pills,
  actions,
  toggle,
  onClear,
  activeCount,
  collapsible = false,
  children,
  className,
}: FilterBarProps) {
  const t = useTucuMessages().filters;
  const [expanded, setExpanded] = useState(false);
  const count = activeCount ?? countActiveFilters({ search, filters, toggle });
  const showBody = !collapsible || expanded;

  return (
    <div
      data-tucu="filter-bar"
      data-active-count={count}
      className={cn('flex flex-col gap-3', className)}
    >
      {collapsible && (
        <div className="md:hidden">
          <Button
            type="button"
            variant="outline"
            size="mini"
            aria-expanded={expanded}
            onClick={() => setExpanded((open) => !open)}
            data-tucu="filter-bar-toggle"
          >
            {expanded ? t.hide : t.show}
            {count > 0 && ` (${t.activeCount.replace('{count}', String(count))})`}
          </Button>
        </div>
      )}
      <div
        data-tucu="filter-bar-body"
        className={cn(
          'flex-wrap items-end gap-3',
          showBody ? 'flex' : collapsible ? 'hidden md:flex' : 'flex'
        )}
      >
        {search && (
          <Input
            type="search"
            size="sm"
            value={search.value}
            placeholder={search.placeholder ?? t.search}
            aria-label={search.placeholder ?? t.search}
            onChange={(event) => search.onChange(event.target.value)}
            className="min-w-[12rem] flex-1 sm:max-w-xs"
          />
        )}
        {filters?.map((filter) => (
          <Select
            key={filter.id}
            size="sm"
            label={filter.label}
            options={filter.options}
            value={filter.value}
            onSelect={filter.onChange}
            className={cn('min-w-[9rem]', filter.className)}
            data-tucu-filter={filter.id}
          />
        ))}
        {toggle && (
          <Switch
            checked={toggle.checked}
            onChange={toggle.onChange}
            label={toggle.label}
          />
        )}
        {pills && (
          <div data-tucu="filter-bar-pills" className="flex flex-wrap items-center gap-2">
            {pills}
          </div>
        )}
        {children}
        {onClear && count > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="mini"
            onClick={onClear}
            data-tucu="filter-bar-clear"
          >
            {t.clear}
          </Button>
        )}
        {actions && (
          <div data-tucu="filter-bar-actions" className="ml-auto flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterBar;
