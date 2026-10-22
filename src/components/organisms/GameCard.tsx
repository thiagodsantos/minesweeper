import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'

type GameCardProps = {
  playfield: ReactNode
  settings: ReactNode
}

export function GameCard({ playfield, settings }: GameCardProps) {
  const { t } = useTranslation()
  return (
    <section className="game-card" aria-label={t('boardLabel')}>
      {playfield}
      {settings}
    </section>
  )
}
