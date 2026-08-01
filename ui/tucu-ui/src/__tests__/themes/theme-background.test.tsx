import { describe, it, expect, afterEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import React from 'react';

import { ThemeBackground } from '../../themes/components/theme-background';

/**
 * Regression for the "background lost on full refresh" bug: a browser-cached
 * image finishes loading before React attaches onLoad, so the load event
 * never fires and the image stayed at opacity-0 forever. The component must
 * detect an already-complete image via ref after mount.
 */

function mockAlreadyLoadedImages(naturalWidth: number) {
  Object.defineProperty(window.HTMLImageElement.prototype, 'complete', {
    configurable: true,
    get: () => true,
  });
  Object.defineProperty(window.HTMLImageElement.prototype, 'naturalWidth', {
    configurable: true,
    get: () => naturalWidth,
  });
}

afterEach(() => {
  // Restore jsdom defaults so other tests see pristine <img> behavior.
  delete (window.HTMLImageElement.prototype as never)['complete'];
  delete (window.HTMLImageElement.prototype as never)['naturalWidth'];
});

describe('ThemeBackground cached-image handling', () => {
  it('shows an image that was already complete before onLoad could attach', async () => {
    mockAlreadyLoadedImages(1200);

    const { container } = render(
      <ThemeBackground variant="wallpaper" mode="absolute" />
    );

    const img = container.querySelector('img');
    if (!img) throw new Error('expected the background image to render');
    await waitFor(() => {
      expect(img.className).toContain('opacity-100');
    });
  });

  it('treats a complete image with no dimensions as failed and removes it', async () => {
    mockAlreadyLoadedImages(0);

    const { container } = render(
      <ThemeBackground variant="wallpaper" mode="absolute" />
    );

    await waitFor(() => {
      expect(container.querySelector('img')).toBeNull();
    });
  });

  it('keeps the fade-in path for images that load normally', () => {
    // No mock: jsdom images are never complete, so the img must start hidden.
    const { container } = render(
      <ThemeBackground variant="wallpaper" mode="absolute" />
    );

    const img = container.querySelector('img');
    if (!img) throw new Error('expected the background image to render');
    expect(img.className).toContain('opacity-0');
  });
});
