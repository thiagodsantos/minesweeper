import type { GameState } from '@/features/game/types'

export function toggleFlag(state: GameState, row: number, column: number): GameState {
  if (state.status === 'won' || state.status === 'lost') return state
  if (row < 0 || column < 0 || row >= state.config.rows || column >= state.config.columns) return state

  const cell = state.board[row][column]
  if (cell.revealed) return state
  const board = state.board.map((cells) => cells.map((current) => ({ ...current })))
  board[row][column].flagged = !cell.flagged
  return { ...state, board }
}
