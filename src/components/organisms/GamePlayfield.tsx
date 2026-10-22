import { useTranslation } from 'react-i18next'
import { GameBoard } from '@/components/organisms/GameBoard'
import { GameStatusMessage } from '@/components/molecules/GameStatusMessage'
import { GameToolbar } from '@/components/molecules/GameToolbar'
import { FieldHeading } from '@/components/molecules/FieldHeading'
import { formatTime } from '@/shared/utils/formatTime'
import type { GameState } from '@/features/game/types'

type GamePlayfieldProps = {
  game: GameState
  countdown: number | null
  seconds: number
  minesLeft: number
  onRestart: () => void
  onReveal: (row: number, column: number) => void
  onToggleFlag: (row: number, column: number) => void
}

export function GamePlayfield({
  game,
  countdown,
  seconds,
  minesLeft,
  onRestart,
  onReveal,
  onToggleFlag,
}: GamePlayfieldProps) {
  const { t } = useTranslation()
  return (
    <div className="field-panel">
      <div className="field-toolbar">
        <FieldHeading rows={game.config.rows} columns={game.config.columns} />
        <GameToolbar minesLeft={minesLeft} time={formatTime(seconds)} onRestart={onRestart} />
      </div>
      <GameStatusMessage status={game.status} countdown={countdown} />
      <GameBoard game={game} countdown={countdown} onReveal={onReveal} onToggleFlag={onToggleFlag} />
      <p className="board-hint">{t('flagHint')}</p>
    </div>
  )
}
