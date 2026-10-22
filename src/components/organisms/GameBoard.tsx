import { BoardRow } from '@/components/molecules/BoardRow'
import { CountdownOverlay } from '@/components/atoms/CountdownOverlay'
import type { GameState } from '@/features/game/types'
import { getBoardColumnStyle } from '@/shared/utils/boardColumnStyle'
import { useTranslation } from 'react-i18next'

type GameBoardProps = {
  game: GameState
  countdown: number | null
  onReveal: (row: number, column: number) => void
  onToggleFlag: (row: number, column: number) => void
}

export function GameBoard({ game, countdown, onReveal, onToggleFlag }: GameBoardProps) {
  const { t } = useTranslation()
  const { rows, columns } = game.config
  const locked = countdown !== null

  return (
    <div className="board-stage">
      <div className="board-scroll" role="region" aria-label={t('boardLabel')} tabIndex={0}>
        <div
          className="game-board"
          role="grid"
          aria-rowcount={rows}
          aria-colcount={columns}
          style={getBoardColumnStyle(columns)}
        >
          {game.board.map((cells, row) => (
            <BoardRow
              key={row}
              cells={cells}
              row={row}
              status={game.status}
              disabled={locked}
              onReveal={onReveal}
              onToggleFlag={onToggleFlag}
            />
          ))}
        </div>
      </div>
      {countdown !== null && <CountdownOverlay count={countdown} />}
    </div>
  )
}
