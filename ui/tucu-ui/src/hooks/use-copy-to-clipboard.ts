import * as useCopyToClipboardModule from 'react-use/lib/useCopyToClipboard';
import type UseCopyToClipboard from 'react-use/lib/useCopyToClipboard';
import { unwrapCjsDefault } from './internal/cjs-esm-interop';

export const useCopyToClipboard = unwrapCjsDefault<typeof UseCopyToClipboard>(
  useCopyToClipboardModule
);
