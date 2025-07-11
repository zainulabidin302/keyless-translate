import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { createI18n } from '@zainulabidin302/keyless-translate-core';
import { I18nProvider } from '@zainulabidin302/keyless-translate-react';
import { MockLoader } from './mockLoader.ts';

const i18n = createI18n({
  sourceLocale: 'en',
  locale: 'en',
  loader: new MockLoader(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider i18n={i18n}>
      <App />
    </I18nProvider>
  </React.StrictMode>
);
