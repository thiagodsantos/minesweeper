import { useTranslation } from 'react-i18next'

import type { GameConfig } from '@/features/game/types'

type SettingsFieldProps = {
  name: keyof GameConfig
  label: string
  min: number
  value: number
  error?: string
  onChange: (name: keyof GameConfig, value: string) => void

}

export function SettingsField({ name, label, min, value, error, onChange }: SettingsFieldProps) {
  const { t } = useTranslation()
  return (
    <label className="field">
      <span>{label}</span>
      <input
        aria-label={label}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        type="number"
        inputMode="numeric"
        min={min}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
      />
      {error && (
        <span id={`${name}-error`} className="field-error" role="alert">
          {t(`settingsErrors.${error}`)}
        </span>
      )}
    </label>
  )
}
