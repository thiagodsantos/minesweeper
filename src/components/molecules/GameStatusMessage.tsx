import { useTranslation } from 'react-i18next'
import type { GameStatus } from '@/features/game/types'
import { getStatusTranslationKeys } from '@/shared/utils/getStatusTranslationKeys'

type GameStatusMessageProps = {
  status: GameStatus
  countdown: number | null
}

export function GameStatusMessage({ status, countdown }: GameStatusMessageProps) {
  const { t } = useTranslation()
  const [messageKey, shortStatusKey] = getStatusTranslationKeys(status)

  return (
    <div className={`game-status status-${countdown === null ? status : 'countdown'}`} aria-live={countdown === null ? 'polite' : 'off'}>
      <span className="status-dot" aria-hidden="true" />
      <span>{countdown === null ? t(messageKey) : t('startingIn', { count: countdown })}</span>
      <span className="status-tag">{countdown === null ? t(shortStatusKey) : t('statusStarting')}</span>
    </div>
  )
}
