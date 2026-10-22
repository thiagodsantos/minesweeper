import { describe, expect, it } from 'vitest'
import { createGame, revealCell, toggleFlag, validateConfig } from '@/features/game'
import type { GameConfig, GameState } from '@/features/game/types'

const config: GameConfig = { rows: 10, columns: 10, mines: 10 }

function gameWithMinesAt(positions: Array<[number, number]>): GameState {
  const state = createGame(config, () => 0)
  const board = state.board.map((row) => row.map((cell) => ({ ...cell, mine: false, adjacentMines: 0 })))
  for (const [row, column] of positions) board[row][column].mine = true
  for (let row = 0; row < config.rows; row += 1) {
    for (let column = 0; column < config.columns; column += 1) {
      if (board[row][column].mine) continue
      board[row][column].adjacentMines = board
        .slice(Math.max(0, row - 1), Math.min(config.rows, row + 2))
        .flatMap((cells) => cells.slice(Math.max(0, column - 1), Math.min(config.columns, column + 2)))
        .filter((cell) => cell.mine).length
    }
  }
  return { ...state, board }
}

describe('validateConfig', () => {
  it('requires at least 10 rows, columns, and mines', () => {
    expect(validateConfig({ rows: 9, columns: 10, mines: 9 })).toEqual({
      rows: 'minimumRows',
      mines: 'minimumMines',
    })
    expect(validateConfig(config)).toEqual({})
  })

  it('rejects mine counts that fill the board', () => {
    expect(validateConfig({ ...config, mines: 100 })).toEqual({ mines: 'tooManyMines' })
  })
})

describe('game actions', () => {
  it('creates the configured number of unique mines with correct neighbor counts', () => {
    const game = createGame(config)
    expect(game.board.flat().filter((cell) => cell.mine)).toHaveLength(config.mines)
    for (let row = 0; row < config.rows; row += 1) {
      for (let column = 0; column < config.columns; column += 1) {
        const cell = game.board[row][column]
        let expectedCount = 0
        for (let neighborRow = Math.max(0, row - 1); neighborRow <= Math.min(config.rows - 1, row + 1); neighborRow += 1) {
          for (let neighborColumn = Math.max(0, column - 1); neighborColumn <= Math.min(config.columns - 1, column + 1); neighborColumn += 1) {
            if ((neighborRow !== row || neighborColumn !== column) && game.board[neighborRow][neighborColumn].mine) {
              expectedCount += 1
            }
          }
        }
        expect(cell.adjacentMines).toBe(expectedCount)
        expect(cell.revealed).toBe(false)
      }
    }
  })

  it('flags and unflags covered cells, but never revealed cells', () => {
    const game = gameWithMinesAt([[9, 9]])
    const flagged = toggleFlag(game, 0, 0)
    expect(flagged.board[0][0].flagged).toBe(true)
    expect(toggleFlag(flagged, 0, 0).board[0][0].flagged).toBe(false)
    const revealed = revealCell(game, 0, 0)
    expect(toggleFlag(revealed, 0, 0)).toBe(revealed)
  })

  it('expands empty regions, reveals the boundary, and wins when the field is clear', () => {
    const game = gameWithMinesAt([[9, 9]])
    const next = revealCell(game, 0, 0)
    expect(next.status).toBe('won')
    expect(next.board[0][0].revealed).toBe(true)
    expect(next.board[8][8].revealed).toBe(true)
    expect(next.board[9][9].revealed).toBe(false)
  })

  it('ends the game when a mine is revealed and marks the exploded cell', () => {
    const game = gameWithMinesAt([[4, 4]])
    const next = revealCell(game, 4, 4)
    expect(next.status).toBe('lost')
    expect(next.board[4][4].exploded).toBe(true)
    expect(revealCell(next, 0, 0)).toBe(next)
  })

  it('wins when every safe cell has been revealed, without requiring flags', () => {
    const game = gameWithMinesAt([[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9]])
    let next = game
    for (let row = 1; row < config.rows; row += 1) {
      for (let column = 0; column < config.columns; column += 1) {
        next = revealCell(next, row, column)
      }
    }
    expect(next.status).toBe('won')
  })
})
