import { useTranslation } from 'react-i18next'

type RestartButtonProps = {
  onRestart: () => void
}

export function RestartButton({ onRestart }: RestartButtonProps) {
  const { t } = useTranslation()
  return (
    <button className="restart-button" type="button" onClick={onRestart} aria-label={t('restart')}>
      <span aria-hidden="true">↻</span>
      <span>{t('newGame')}</span>
    </button>
  )
}
