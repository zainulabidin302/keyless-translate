import { useTranslation } from '@zainulabidin302/keyless-translate-react';
import './App.css';

function App() {
  const { t, setLocale, locale } = useTranslation();

  const handleLanguageChange = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    setLocale(newLocale);
  };

  return (
    <>
      <h1>{t('Welcome to your new library!')}</h1>
      <div className="card">
        <p>{t('Current language: {{lang}}', { lang: locale })}</p>
        <button onClick={handleLanguageChange}>
          {locale === 'en' ? t('Switch to Spanish') : t('Switch to English')}
        </button>
      </div>
    </>
  );
}

export default App;
