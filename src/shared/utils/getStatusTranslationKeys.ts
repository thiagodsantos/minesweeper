import type { GameStatus } from '@/features/game/types'

export function getStatusTranslationKeys(status: GameStatus) {
  return {
    ready: ['statusReady', 'statusReadyShort'],
    playing: ['statusPlaying', 'statusPlayingShort'],
    won: ['statusWon', 'statusWonShort'],
    lost: ['statusLost', 'statusLostShort'],
  }[status]
}
