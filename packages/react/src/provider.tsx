import React, { createContext } from 'react';
import type { I18nInstance } from '@zainulabidin302/keyless-translate-core';

export const I18nContext = createContext<I18nInstance | null>(null);

export function I18nProvider({
  i18n,
  children,
}: {
  i18n: I18nInstance;
  children: React.ReactNode;
}) {
  return <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>;
}
