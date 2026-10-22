import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'

const nextLanguage: Record<string, string> = {
  en: 'es',
  es: 'pt-BR',
  'pt-BR': 'en',
}

const languageCode: Record<string, string> = {
  en: 'EN',
  es: 'ES',
  'pt-BR': 'PT-BR',
}

export function LanguageSwitcher() {
  const { t } = useTranslation()
  const currentLanguage = i18n.resolvedLanguage ?? 'en'

  useEffect(() => {
    document.documentElement.lang = currentLanguage
  }, [currentLanguage])

  return (
    <button
      className="language-button"
      type="button"
      aria-label={t('language')}
      onClick={() => void i18n.changeLanguage(nextLanguage[currentLanguage] ?? 'en')}
    >
      <span aria-hidden="true">文</span> {languageCode[currentLanguage] ?? 'EN'}
    </button>
  )
}
