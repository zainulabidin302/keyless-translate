import { I18nLoader, I18nEvents } from './types';
import { debounce, interpolate } from './utils';

type Listener = (type: I18nEvents) => void;


export function createI18n(options: {
  sourceLocale: string;
  locale: string;
  loader: I18nLoader;
  initialMessages?: Record<string, Record<string, string>>;
}) {
  const { sourceLocale, loader } = options;
  let currentLocale = options.locale;
  const cache: Record<string, Record<string, string>> = options.initialMessages || {};
  
  const listeners = new Set<Listener>();
  let pendingTexts = new Set<string>();

  const fetchPendingTranslations = async () => {
    if (pendingTexts.size === 0) return;

    const textsToFetch = Array.from(pendingTexts);
    pendingTexts.clear();

    try {
      const translations = await loader.load(sourceLocale, currentLocale, textsToFetch);
      
      if (!cache[currentLocale]) {
        cache[currentLocale] = {};
      }
      Object.assign(cache[currentLocale], translations);
      
      listeners.forEach((cb) => cb('translationsLoaded'));
    } catch (error) {
      console.error("Failed to load translations:", error);
    }
  };

  const debouncedFetch = debounce(fetchPendingTranslations, 50);

  const i18n = {
    getLocale: () => currentLocale,
    
    setLocale: async (newLocale: string) => {
      currentLocale = newLocale;
      listeners.forEach((cb) => cb('languageChanged'));
      // You could pre-fetch common translations here if desired
    },

    t: (sourceText: string, replacements?: Record<string, string | number>): string => {
      if (currentLocale === sourceLocale) {
        return interpolate(sourceText, replacements);
      }

      const translatedText = cache[currentLocale]?.[sourceText];

      if (translatedText) {
        return interpolate(translatedText, replacements);
      }
      
      pendingTexts.add(sourceText);
      debouncedFetch();
      
      return interpolate(sourceText, replacements);
    },

    subscribe: (callback: Listener): (() => void) => {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
  };

  return i18n;
}

export type I18nInstance = ReturnType<typeof createI18n>;
export type { I18nLoader, I18nEvents } from './types';