import { getNeighbors } from '@/features/game/getNeighbors'
import { hasWon } from '@/features/game/hasWon'
import type { GameState } from '@/features/game/types'

export function revealCell(state: GameState, row: number, column: number): GameState {
  if (state.status === 'won' || state.status === 'lost') return state
  if (row < 0 || column < 0 || row >= state.config.rows || column >= state.config.columns) return state

  const selected = state.board[row][column]
  if (selected.revealed || selected.flagged) return state

  if (selected.mine) {
    const board = state.board.map((cells) => cells.map((cell) => ({ ...cell })))
    board[row][column].exploded = true
    return { ...state, board, status: 'lost' }
  }

  const board = state.board.map((cells) => cells.map((cell) => ({ ...cell })))
  const pending: Array<[number, number]> = [[row, column]]
  while (pending.length > 0) {
    const [currentRow, currentColumn] = pending.pop()!
    const current = board[currentRow][currentColumn]
    if (current.revealed || current.flagged || current.mine) continue

    current.revealed = true
    if (current.adjacentMines === 0) {
      for (const [neighborRow, neighborColumn] of getNeighbors(
        currentRow,
        currentColumn,
        state.config.rows,
        state.config.columns,
      )) {
        const neighbor = board[neighborRow][neighborColumn]
        if (!neighbor.revealed && !neighbor.flagged && !neighbor.mine) {
          pending.push([neighborRow, neighborColumn])
        }
      }
    }
  }

  const nextState = { ...state, board, status: 'playing' as const }
  return hasWon(nextState) ? { ...nextState, status: 'won' } : nextState
}
