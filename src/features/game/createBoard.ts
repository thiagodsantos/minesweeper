import { getNeighbors } from '@/features/game/getNeighbors'
import type { Cell, GameConfig } from '@/features/game/types'

export function createBoard(config: GameConfig, random: () => number): Cell[][] {
  const { rows, columns, mines } = config
  const positions = Array.from({ length: rows * columns }, (_, index) => index)

  for (let index = positions.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    ;[positions[index], positions[swapIndex]] = [positions[swapIndex], positions[index]]
  }

  const minePositions = new Set(positions.slice(0, mines))
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: columns }, (_, column) => {
      const mine = minePositions.has(row * columns + column)
      const adjacentMines = getNeighbors(row, column, rows, columns)
        .filter(([neighborRow, neighborColumn]) => minePositions.has(neighborRow * columns + neighborColumn)).length
      return { mine, adjacentMines, revealed: false, flagged: false, exploded: false }
    }),
  )
}
