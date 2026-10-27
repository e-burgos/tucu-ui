import classNames from 'classnames';
import { extendTailwindMerge } from 'tailwind-merge';

export interface ClassMergeTokens {
  fontSize?: string[];
  shadow?: string[];
  radius?: string[];
  color?: string[];
  fontFamily?: string[];
}

const libraryTokens: Required<ClassMergeTokens> = {
  fontSize: ['13px'],
  shadow: ['button', 'card', 'expand', 'large', 'light', 'main', 'transaction'],
  radius: [],
  color: [],
  fontFamily: [],
};

let registeredTokens: Required<ClassMergeTokens> = libraryTokens;

function buildTucuTwMerge(tokens: Required<ClassMergeTokens>) {
  return extendTailwindMerge({
    extend: {
      theme: {
        text: tokens.fontSize,
        shadow: tokens.shadow,
        radius: tokens.radius,
        color: tokens.color,
        font: tokens.fontFamily,
      },
    },
  });
}

let tucuTwMerge = buildTucuTwMerge(registeredTokens);

export function extendClassMergeTokens(tokens: ClassMergeTokens): void {
  registeredTokens = {
    fontSize: [...registeredTokens.fontSize, ...(tokens.fontSize ?? [])],
    shadow: [...registeredTokens.shadow, ...(tokens.shadow ?? [])],
    radius: [...registeredTokens.radius, ...(tokens.radius ?? [])],
    color: [...registeredTokens.color, ...(tokens.color ?? [])],
    fontFamily: [...registeredTokens.fontFamily, ...(tokens.fontFamily ?? [])],
  };
  tucuTwMerge = buildTucuTwMerge(registeredTokens);
}

export function resetClassMergeTokens(): void {
  registeredTokens = libraryTokens;
  tucuTwMerge = buildTucuTwMerge(registeredTokens);
}

export type ClassValue = classNames.Argument;

export function cn(...inputs: ClassValue[]): string {
  return tucuTwMerge(classNames(...inputs));
}
