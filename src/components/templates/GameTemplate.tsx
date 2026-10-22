import type { ReactNode } from 'react'

type GameTemplateProps = {
  header: ReactNode
  footer: ReactNode
  children: ReactNode
}

export function GameTemplate({ header, footer, children }: GameTemplateProps) {
  return (
    <main className="page-shell">
      <div className="game-frame">
        {header}
        {children}
        {footer}
      </div>
    </main>
  )
}
