import { BoardCell } from '@/components/atoms/BoardCell'
import type { Cell, GameStatus } from '@/features/game/types'

type BoardRowProps = {
  cells: Cell[]
  row: number
  status: GameStatus
  disabled: boolean
  onReveal: (row: number, column: number) => void
  onToggleFlag: (row: number, column: number) => void
}

export function BoardRow({ cells, row, status, disabled, onReveal, onToggleFlag }: BoardRowProps) {
  return (
    <div className="board-row" role="row">
      {cells.map((cell, column) => (
        <BoardCell
          key={column}
          cell={cell}
          row={row}
          column={column}
          status={status}
          disabled={disabled}
          onReveal={onReveal}
          onToggleFlag={onToggleFlag}
        />
      ))}
    </div>
  )
}
