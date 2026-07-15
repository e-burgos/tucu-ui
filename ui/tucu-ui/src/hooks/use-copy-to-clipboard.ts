import { useCallback, useState } from 'react';

export type CopyToClipboardState = {
  value?: string;
  error?: Error;
  noUserInteraction: boolean;
};

function legacyCopy(text: string): boolean {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  let succeeded = false;
  try {
    succeeded = document.execCommand('copy');
  } catch {
    succeeded = false;
  }
  document.body.removeChild(textarea);
  return succeeded;
}

export function useCopyToClipboard(): [
  CopyToClipboardState,
  (text: string) => void
] {
  const [state, setState] = useState<CopyToClipboardState>({
    value: undefined,
    error: undefined,
    noUserInteraction: true,
  });

  const copyToClipboard = useCallback((text: string) => {
    if (typeof text !== 'string') {
      setState({
        value: text,
        error: new Error(
          `Cannot copy typeof ${typeof text} to clipboard, must be a string`
        ),
        noUserInteraction: true,
      });
      return;
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(
        () => setState({ value: text, error: undefined, noUserInteraction: false }),
        (error: Error) =>
          setState({ value: text, error, noUserInteraction: false })
      );
      return;
    }

    const succeeded = legacyCopy(text);
    setState({
      value: text,
      error: succeeded ? undefined : new Error('Copy failed'),
      noUserInteraction: false,
    });
  }, []);

  return [state, copyToClipboard];
}
