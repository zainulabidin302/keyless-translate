import type { I18nLoader } from '@keyless-translate/core';

// Mock translations
const db: Record<string, Record<string, string>> = {
  es: {
    'Welcome to your new library!': '¡Bienvenido a tu nueva librería!',
    'Current language: {{lang}}': 'Idioma actual: {{lang}}',
    'Switch to Spanish': 'Cambiar a español',
    'Switch to English': 'Cambiar a inglés',
  },
};

export class MockLoader implements I18nLoader {
  async load(
    _sourceLocale: string,
    targetLocale: string,
    texts: string[]
  ): Promise<Record<string, string>> {
    console.log(`[MockLoader] Faking API call to translate to "${targetLocale}":`, texts);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const translations: Record<string, string> = {};
    for (const text of texts) {
      translations[text] = db[targetLocale]?.[text] ?? `[${targetLocale}] ${text}`;
    }
    
    console.log('[MockLoader] Received:', translations);
    return translations;
  }
}
