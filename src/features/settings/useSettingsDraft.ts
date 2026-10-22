import { useState, type FormEvent } from 'react'
import { validateConfig } from '@/features/game/validateConfig'
import type { ConfigErrors } from '@/features/game/configErrors'
import type { GameConfig } from '@/features/game/types'

type UseSettingsDraftOptions = {
  config: GameConfig
  onApply: (config: GameConfig) => void
}

export function useSettingsDraft({ config, onApply }: UseSettingsDraftOptions) {
  const [draft, setDraft] = useState(config)
  const [errors, setErrors] = useState<ConfigErrors>({})

  function updateField(field: keyof GameConfig, value: string) {
    setDraft((current) => ({ ...current, [field]: value === '' ? 0 : Number(value) }))
    setErrors((current) => ({ ...current, [field]: undefined, mines: undefined }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateConfig(draft)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) onApply(draft)
  }

  return { draft, errors, updateField, handleSubmit }
}
