export type GameConfig = {
  rows: number
  columns: number
  mines: number
}

export type GameStatus = 'ready' | 'playing' | 'won' | 'lost'

export type Cell = {
  mine: boolean
  adjacentMines: number
  revealed: boolean
  flagged: boolean
  exploded: boolean
}

export type GameState = {
  config: GameConfig
  board: Cell[][]
  status: GameStatus
}
