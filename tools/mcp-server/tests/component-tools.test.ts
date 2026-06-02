import { describe, it, expect } from 'vitest';
import {
  componentRegistry,
  getCategories,
  getComponentByName,
  getComponentsByCategory,
} from '../src/data/component-registry.js';

describe('Component Registry', () => {
  it('contains 60+ components', () => {
    expect(componentRegistry.length).toBeGreaterThanOrEqual(60);
  });

  it('getCategories returns non-empty array', () => {
    const categories = getCategories();
    expect(categories.length).toBeGreaterThan(0);
    expect(categories).toContain('buttons');
    expect(categories).toContain('inputs');
  });

  it('getComponentByName finds exact match (case insensitive)', () => {
    const button = getComponentByName('Button');
    expect(button).toBeDefined();
    expect(button!.name).toBe('Button');
    expect(button!.category).toBe('buttons');
  });

  it('getComponentByName returns undefined for non-existent', () => {
    const result = getComponentByName('NonExistentComponent');
    expect(result).toBeUndefined();
  });

  it('getComponentsByCategory returns correct components', () => {
    const buttons = getComponentsByCategory('buttons');
    expect(buttons.length).toBeGreaterThan(0);
    buttons.forEach((c) => expect(c.category).toBe('buttons'));
  });

  it('getComponentsByCategory returns empty for non-existent category', () => {
    const result = getComponentsByCategory('nonexistent');
    expect(result).toHaveLength(0);
  });

  it('all entries have required fields', () => {
    componentRegistry.forEach((entry) => {
      expect(entry.name).toBeTruthy();
      expect(entry.category).toBeTruthy();
      expect(entry.description).toBeTruthy();
      expect(entry.importPath).toBeTruthy();
      expect(entry.example).toBeTruthy();
      expect(typeof entry.themeAware).toBe('boolean');
    });
  });

  it('Button has correct variants (NEVER primary/outline/destructive)', () => {
    const button = getComponentByName('Button');
    expect(button).toBeDefined();
    expect(button!.variants?.variant).toEqual(['solid', 'ghost', 'transparent']);
    expect(button!.variants?.size).toEqual(['large', 'medium', 'small', 'mini', 'tiny']);
    // Ensure invalid variants are NOT present
    expect(button!.variants?.variant).not.toContain('primary');
    expect(button!.variants?.variant).not.toContain('outline');
    expect(button!.variants?.variant).not.toContain('destructive');
  });

  it('Button has warnings about invalid variants', () => {
    const button = getComponentByName('Button');
    expect(button!.warnings).toBeDefined();
    expect(button!.warnings!.length).toBeGreaterThan(0);
    expect(button!.warnings!.some((w) => w.includes('NEVER'))).toBe(true);
  });

  it('DataTable is registered under tables category with correct data', () => {
    const datatable = getComponentByName('DataTable');
    expect(datatable).toBeDefined();
    expect(datatable!.category).toBe('tables');
    expect(datatable!.variants?.mode).toEqual(['light', 'dark']);
    expect(datatable!.example).toContain('import { DataTable }');
    expect(datatable!.example).toContain('<DataTable');
  });

  it('DataTableComponent is registered under tables category', () => {
    const dtComp = getComponentByName('DataTableComponent');
    expect(dtComp).toBeDefined();
    expect(dtComp!.category).toBe('tables');
    expect(dtComp!.example).toContain('<DataTableComponent');
  });
});

describe('Component Tools Registration', () => {
  it('createMcpServer returns a server instance', async () => {
    const { createMcpServer } = await import('../src/server.js');
    const server = createMcpServer();
    expect(server).toBeDefined();
  });
});
