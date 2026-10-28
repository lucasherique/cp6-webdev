import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { AuthContext, type AuthStatus, type AuthValue } from '../../context/auth-context'

function renderAt(status: AuthStatus) {
  const value: AuthValue = {
    status,
    email: status === 'authenticated' ? 'dono@exemplo.com' : null,
    signIn: async () => {},
    signOut: async () => {},
  }
  return render(
    <AuthContext.Provider value={value}>
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/login" element={<p>Página de login</p>} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <p>Painel secreto</p>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  )
}

describe('ProtectedRoute', () => {
  it('redireciona para /login quando não há login', () => {
    renderAt('unauthenticated')
    expect(screen.getByText('Página de login')).toBeInTheDocument()
    expect(screen.queryByText('Painel secreto')).not.toBeInTheDocument()
  })

  it('não revela o painel enquanto verifica a sessão', () => {
    renderAt('loading')
    expect(screen.queryByText('Painel secreto')).not.toBeInTheDocument()
    expect(screen.queryByText('Página de login')).not.toBeInTheDocument()
  })

  it('mostra o painel quando autenticado', () => {
    renderAt('authenticated')
    expect(screen.getByText('Painel secreto')).toBeInTheDocument()
  })
})
