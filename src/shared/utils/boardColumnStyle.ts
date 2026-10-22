import type { CSSProperties } from 'react'

export function getBoardColumnStyle(columns: number): CSSProperties {
  return { '--columns': columns } as CSSProperties
}
