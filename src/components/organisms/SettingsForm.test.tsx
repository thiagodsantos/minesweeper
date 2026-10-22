import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import '@/i18n'
import { SettingsForm } from '@/components/organisms/SettingsForm'

const config = { rows: 10, columns: 10, mines: 15 }

describe('SettingsForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('starts a new game with valid custom settings', async () => {
    const user = userEvent.setup()
    const onApply = vi.fn()
    render(<SettingsForm config={config} onApply={onApply} />)

    await user.clear(screen.getByRole('spinbutton', { name: 'Rows' }))
    await user.type(screen.getByRole('spinbutton', { name: 'Rows' }), '12')
    await user.clear(screen.getByRole('spinbutton', { name: 'Mines' }))
    await user.type(screen.getByRole('spinbutton', { name: 'Mines' }), '20')
    await user.click(screen.getByRole('button', { name: /apply/i }))

    expect(onApply).toHaveBeenCalledWith({ rows: 12, columns: 10, mines: 20 })
  })

  it('shows validation errors and does not apply an invalid board', async () => {
    const user = userEvent.setup()
    const onApply = vi.fn()
    render(<SettingsForm config={config} onApply={onApply} />)

    await user.clear(screen.getByRole('spinbutton', { name: 'Rows' }))
    await user.type(screen.getByRole('spinbutton', { name: 'Rows' }), '9')
    await user.click(screen.getByRole('button', { name: /apply/i }))

    expect(screen.getByRole('alert')).toHaveTextContent('Use at least 10 rows.')
    expect(onApply).not.toHaveBeenCalled()
  })
})
