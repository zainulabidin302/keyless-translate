export interface I18nLoader {
  load(
    sourceLocale: string,
    targetLocale: string,
    texts: string[]
  ): Promise<Record<string, string>>;
}

export type I18nEvents = 'languageChanged' | 'translationsLoaded';
