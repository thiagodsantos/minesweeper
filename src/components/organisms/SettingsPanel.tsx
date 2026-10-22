import { useTranslation } from 'react-i18next'
import { SettingsForm } from '@/components/organisms/SettingsForm'
import type { GameConfig } from '@/features/game/types'

type SettingsPanelProps = {
  config: GameConfig
  onApply: (config: GameConfig) => void
}

export function SettingsPanel({ config, onApply }: SettingsPanelProps) {
  const { t } = useTranslation()
  return (
    <aside className="settings-panel">
      <SettingsForm config={config} onApply={onApply} />
      <div className="legend" aria-hidden="true">
        <p><span className="legend-swatch covered-swatch" /> {t('legendCovered')}</p>
        <p><span className="legend-swatch open-swatch">2</span> {t('legendNearby')}</p>
        <p><span className="legend-swatch flag-swatch">⚑</span> {t('legendFlag')}</p>
      </div>
    </aside>
  )
}
