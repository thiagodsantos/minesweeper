import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '@/App'
import i18n from '@/i18n'

describe('GamePage', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  afterEach(async () => {
    vi.useRealTimers()
    await i18n.changeLanguage('en')
  })

  it('locks the board for the three-second start countdown', async () => {
    vi.useFakeTimers()
    render(<App />)

    expect(screen.getByRole('status')).toHaveTextContent('Starting in 3')
    expect(screen.getByRole('gridcell', { name: 'Covered square, row 1, column 1' })).toBeDisabled()

    await act(async () => {
      vi.advanceTimersByTime(1000)
    })
    await act(async () => {
      vi.advanceTimersByTime(1000)
    })
    await act(async () => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(screen.getByRole('gridcell', { name: 'Covered square, row 1, column 1' })).toBeEnabled()
  })

  it('cycles to the Brazilian Portuguese translation', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Language' }))
    await user.click(screen.getByRole('button', { name: 'Idioma' }))

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Campo Minado.')
    expect(screen.getByRole('status')).toHaveTextContent('Começando em 3')
  })
})
