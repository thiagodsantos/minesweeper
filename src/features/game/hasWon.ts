import type { GameState } from '@/features/game/types'

export function hasWon(game: GameState): boolean {
  return game.board.every((row) => row.every((cell) => cell.mine || cell.revealed))
}
