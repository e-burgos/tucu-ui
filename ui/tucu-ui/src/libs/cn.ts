import classNames from 'classnames';
import { extendTailwindMerge } from 'tailwind-merge';

const tucuTwMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['13px'],
      shadow: ['button', 'card', 'expand', 'large', 'light', 'main', 'transaction'],
    },
  },
});

export type ClassValue = classNames.Argument;

export function cn(...inputs: ClassValue[]): string {
  return tucuTwMerge(classNames(...inputs));
}
