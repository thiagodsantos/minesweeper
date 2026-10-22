import { useTranslation } from 'react-i18next'
import { SettingsField } from '@/components/molecules/SettingsField'
import { useSettingsDraft } from '@/features/settings/useSettingsDraft'
import type { GameConfig } from '@/features/game/types'

type SettingsFormProps = {
  config: GameConfig
  onApply: (config: GameConfig) => void
}

export function SettingsForm({ config, onApply }: SettingsFormProps) {
  const { t } = useTranslation()
  const { draft, errors, updateField, handleSubmit } = useSettingsDraft({ config, onApply })
  const fields: Array<{ name: keyof GameConfig; label: string; min: number }> = [
    { name: 'rows', label: t('rows'), min: 10 },
    { name: 'columns', label: t('columns'), min: 10 },
    { name: 'mines', label: t('mineCount'), min: 10 },
  ]

  return (
    <form className="settings-form" onSubmit={handleSubmit} noValidate>
      <div className="settings-heading">
        <span className="settings-icon" aria-hidden="true">✳</span>
        <div>
          <h2>{t('settings')}</h2>
          <p>{t('boardDescription', { rows: config.rows, columns: config.columns })}</p>
        </div>
      </div>
      <div className="settings-fields">
        {fields.map(({ name, label, min }) => (
          <SettingsField
            key={name}
            name={name}
            label={label}
            min={min}
            value={draft[name]}
            error={errors[name]}
            onChange={updateField}
          />
        ))}
      </div>
      <button className="apply-button" type="submit">{t('applySettings')} <span aria-hidden="true">↗</span></button>
    </form>
  )
}
