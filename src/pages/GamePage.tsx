import { useState } from 'react'
import { BrandHeader } from '@/components/molecules/BrandHeader'
import { PageFooter } from '@/components/molecules/PageFooter'
import { GameCard } from '@/components/organisms/GameCard'
import { GamePlayfield } from '@/components/organisms/GamePlayfield'
import { SettingsPanel } from '@/components/organisms/SettingsPanel'
import { GameTemplate } from '@/components/templates/GameTemplate'
import { createGame, revealCell, toggleFlag } from '@/features/game'
import { DEFAULT_CONFIG } from '@/features/settings/defaultConfig'
import type { GameConfig } from '@/features/game/types'
import { useCountdown } from '@/shared/hooks/useCountdown'
import { useGameTimer } from '@/shared/hooks/useGameTimer'

export function GamePage() {
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const [game, setGame] = useState(() => createGame(DEFAULT_CONFIG))
  const { countdown, startCountdown } = useCountdown()
  const { seconds, resetTimer } = useGameTimer(game.status === 'playing')
  const flags = game.board.flat().filter((cell) => cell.flagged).length

  function startNewGame(nextConfig: GameConfig = config) {
    setConfig(nextConfig)
    setGame(createGame(nextConfig))
    resetTimer()
    startCountdown()
  }

  function reveal(row: number, column: number) {
    setGame((current) => revealCell(current, row, column))
  }

  function toggleCellFlag(row: number, column: number) {
    setGame((current) => toggleFlag(current, row, column))
  }

  return (
    <GameTemplate header={<BrandHeader />} footer={<PageFooter />}>
      <GameCard
        playfield={(
          <GamePlayfield
            game={game}
            countdown={countdown}
            seconds={seconds}
            minesLeft={config.mines - flags}
            onRestart={() => startNewGame()}
            onReveal={reveal}
            onToggleFlag={toggleCellFlag}
          />
        )}
        settings={<SettingsPanel config={config} onApply={startNewGame} />}
      />
    </GameTemplate>
  )
}
