import type { GameConfig } from '@/features/game/types'

export type ConfigErrors = Partial<Record<keyof GameConfig, string>>
