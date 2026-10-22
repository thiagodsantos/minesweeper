import { useTranslation } from 'react-i18next'
import { RestartButton } from '@/components/atoms/RestartButton'
import { StatPill } from '@/components/atoms/StatPill'

type GameToolbarProps = {
  minesLeft: number
  time: string
  onRestart: () => void
}

export function GameToolbar({ minesLeft, time, onRestart }: GameToolbarProps) {
  const { t } = useTranslation()
  return (
    <div className="status-pills">
      <StatPill icon="⚑" label={t('mines')} value={minesLeft} className="mine-pill" />
      <StatPill icon="◷" label={t('time')} value={time} className="time-pill" />
      <RestartButton onRestart={onRestart} />
    </div>
  )
}
