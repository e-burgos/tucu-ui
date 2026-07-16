import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useCopyToClipboard } from '../../hooks/use-copy-to-clipboard';

describe('useCopyToClipboard', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('starts with no value and noUserInteraction true', () => {
    const { result } = renderHook(() => useCopyToClipboard());
    const [state] = result.current;
    expect(state).toEqual({
      value: undefined,
      error: undefined,
      noUserInteraction: true,
    });
  });

  it('writes to navigator.clipboard and updates state on success', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    Object.defineProperty(window, 'isSecureContext', {
      value: true,
      configurable: true,
    });

    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      result.current[1]('hello');
      await Promise.resolve();
    });

    expect(writeText).toHaveBeenCalledWith('hello');
    expect(result.current[0]).toEqual({
      value: 'hello',
      error: undefined,
      noUserInteraction: false,
    });
  });

  it('sets an error when copying a non-string value', () => {
    const { result } = renderHook(() => useCopyToClipboard());

    act(() => {
      // @ts-expect-error deliberately passing a non-string to test the guard
      result.current[1](42);
    });

    const [state] = result.current;
    expect(state.error).toBeInstanceOf(Error);
    expect(state.value).toBe(42);
  });
});
