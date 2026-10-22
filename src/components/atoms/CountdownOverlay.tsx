import { useTranslation } from 'react-i18next'

type CountdownOverlayProps = {
  count: number
}

export function CountdownOverlay({ count }: CountdownOverlayProps) {
  const { t } = useTranslation()
  const label = t('startingIn', { count })
  return (
    <div className="countdown-overlay" role="status" aria-label={label}>
      <div className="countdown-content">
        <span className="countdown-number" aria-hidden="true">{count}</span>
        <p>{label}</p>
      </div>
    </div>
  )
}
