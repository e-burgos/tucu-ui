'use client';

import { createContext } from 'react';
import type { TucuNavigation } from './types';

export const TucuNavigationContext = createContext<TucuNavigation | null>(null);
