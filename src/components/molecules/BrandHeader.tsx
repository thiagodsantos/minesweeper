import { useTranslation } from 'react-i18next'
import { BrandMark } from '@/components/atoms/BrandMark'
import { LanguageSwitcher } from '@/components/atoms/LanguageSwitcher'

export function BrandHeader() {
  const { t } = useTranslation()
  return (
    <header className="page-header">
      <div className="brand-lockup">
        <BrandMark />
        <div>
          <p className="eyebrow">{t('eyebrow')}</p>
          <h1>{t('title')}<span className="title-period">.</span></h1>
        </div>
      </div>
      <div className="header-actions">
        <p className="subtitle">{t('subtitle')}</p>
        <LanguageSwitcher />
      </div>
    </header>
  )
}
