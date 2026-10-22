import type { ConfigErrors } from '@/features/game/configErrors'
import type { GameConfig } from '@/features/game/types'

export function validateConfig(config: GameConfig): ConfigErrors {
  const errors: ConfigErrors = {}
  const { rows, columns, mines } = config

  if (!Number.isInteger(rows) || rows < 10) errors.rows = 'minimumRows'
  if (!Number.isInteger(columns) || columns < 10) errors.columns = 'minimumColumns'
  if (!Number.isInteger(mines) || mines < 10) errors.mines = 'minimumMines'
  if (
    Number.isInteger(rows) && rows >= 10 &&
    Number.isInteger(columns) && columns >= 10 &&
    Number.isInteger(mines) && mines >= rows * columns
  ) {
    errors.mines = 'tooManyMines'
  }

  return errors
}
