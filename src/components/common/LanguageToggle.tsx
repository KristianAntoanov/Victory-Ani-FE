import { useLanguage } from '@/context/LanguageContext';

interface LanguageToggleProps {
  className?: string;
}

export default function LanguageToggle({ className = '' }: LanguageToggleProps) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`language-toggle${className ? ` ${className}` : ''}`}
      role="group"
      aria-label="Language"
      data-testid="language-toggle"
    >
      <button
        type="button"
        className={lang === 'en' ? 'is-active' : undefined}
        aria-pressed={lang === 'en'}
        onClick={() => setLang('en')}
      >
        EN
      </button>
      <button
        type="button"
        className={lang === 'bg' ? 'is-active' : undefined}
        aria-pressed={lang === 'bg'}
        onClick={() => setLang('bg')}
      >
        BG
      </button>
    </div>
  );
}
