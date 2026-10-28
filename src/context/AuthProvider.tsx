import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { getSupabase, isSupabaseConfigured } from '../lib/getSupabase'
import * as authService from '../services/auth'
import { AuthContext, type AuthStatus } from './auth-context'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>(
    isSupabaseConfigured ? 'loading' : 'unauthenticated',
  )
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    let unsubscribe: (() => void) | undefined
    let cancelled = false

    const apply = (sessionEmail: string | null | undefined) => {
      setEmail(sessionEmail ?? null)
      setStatus(sessionEmail ? 'authenticated' : 'unauthenticated')
    }

    getSupabase()
      .then(async (supabase) => {
        if (cancelled) return
        const { data } = await supabase.auth.getSession()
        apply(data.session?.user.email)
        const { data: sub } = supabase.auth.onAuthStateChange((_event, session) =>
          apply(session?.user.email),
        )
        unsubscribe = () => sub.subscription.unsubscribe()
      })
      .catch(() => apply(null))

    return () => {
      cancelled = true
      unsubscribe?.()
    }
  }, [])

  const value = useMemo(
    () => ({ status, email, signIn: authService.signIn, signOut: authService.signOut }),
    [status, email],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
