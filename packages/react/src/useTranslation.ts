import { useContext, useState, useEffect } from 'react';
import { I18nContext } from './provider';

export function useTranslation() {
  const i18n = useContext(I18nContext);
  if (!i18n) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }

  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const unsubscribe = i18n.subscribe(() => {
      forceUpdate((c) => c + 1);
    });
    return unsubscribe;
  }, [i18n]);

  return {
    t: i18n.t,
    setLocale: i18n.setLocale,
    locale: i18n.getLocale(),
  };
}
