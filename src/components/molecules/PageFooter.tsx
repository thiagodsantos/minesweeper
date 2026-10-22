import { useTranslation } from 'react-i18next'

export function PageFooter() {
  const { t } = useTranslation()
  return (
    <footer className="page-footer">
      <span>{t('footerName')}</span>
      <span>{t('footerPace')}</span>
    </footer>
  )
}
