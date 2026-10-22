import { createBoard } from '@/features/game/createBoard'
import { validateConfig } from '@/features/game/validateConfig'
import type { GameConfig, GameState } from '@/features/game/types'

export function createGame(config: GameConfig, random: () => number = Math.random): GameState {
  if (Object.keys(validateConfig(config)).length > 0) {
    throw new RangeError('Invalid game configuration')
  }

  return {
    config: { ...config },
    board: createBoard(config, random),
    status: 'ready',
  }
}
