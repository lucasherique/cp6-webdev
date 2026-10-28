import { createContext, useContext } from 'react'

export type Theme = 'light' | 'dark'

export interface ThemeValue {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeValue | null>(null)

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme deve ser usado dentro de ThemeProvider')
  return ctx
}
