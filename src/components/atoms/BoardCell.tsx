
import { useTranslation } from 'react-i18next'
import type { Cell, GameStatus } from '@/features/game/types'

type BoardCellProps = {
  cell: Cell
  row: number
  column: number
  status: GameStatus
  disabled: boolean
  onReveal: (row: number, column: number) => void
  onToggleFlag: (row: number, column: number) => void
}

export function BoardCell({ cell, row, column, status, disabled, onReveal, onToggleFlag }: BoardCellProps) {
  const { t } = useTranslation()
  const lost = status === 'lost'
  const wrongFlag = lost && cell.flagged && !cell.mine
  const showMine = cell.mine && (lost || status === 'won')
  const isOpen = cell.revealed || showMine
  const position = { row: row + 1, column: column + 1 }
  let label: string

  if (cell.exploded) label = t('cellExploded', position)
  else if (wrongFlag) label = t('cellWrongFlag', position)
  else if (showMine) label = t('cellMine', position)
  else if (cell.flagged) label = t('cellFlagged', position)
  else if (cell.revealed && cell.adjacentMines > 0) {
    label = t('cellNumber', { ...position, count: cell.adjacentMines })
  } else if (cell.revealed) label = t('cellEmpty', position)
  else label = t('cellCovered', position)

  const className = [
    'cell',
    isOpen && !cell.mine ? 'cell-open' : '',
    cell.flagged ? 'cell-flagged' : '',
    cell.exploded ? 'cell-exploded' : '',
    wrongFlag ? 'cell-wrong-flag' : '',
    showMine && !cell.exploded ? 'cell-mine' : '',
  ].filter(Boolean).join(' ')


  return (
    <button
      className={className}
      type="button"
      role="gridcell"
      aria-label={label}
      aria-pressed={cell.flagged}
      disabled={disabled || status === 'won' || status === 'lost'}
      onClick={() => onReveal(row, column)}
      onContextMenu={(event) => {
        event.preventDefault()
        if (!disabled) onToggleFlag(row, column)
      }}
      onKeyDown={(event) => {
        if (event.key.toLowerCase() === 'f') {
          event.preventDefault()
          if (!disabled) onToggleFlag(row, column)
        }
      }}
    >
      {cell.flagged && !wrongFlag ? <span aria-hidden="true" className="flag-mark">⚑</span> : null}
      {wrongFlag ? <span aria-hidden="true" className="wrong-mark">×</span> : null}
      {showMine ? <span aria-hidden="true" className="mine-mark">✹</span> : null}
      {cell.revealed && !cell.mine && cell.adjacentMines > 0 ? (
        <span className={`number number-${cell.adjacentMines}`} aria-hidden="true">
          {cell.adjacentMines}
        </span>
      ) : null}
    </button>
  )
}

