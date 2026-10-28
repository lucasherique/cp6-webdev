import { getSupabase } from '../lib/getSupabase'

export async function signIn(email: string, password: string): Promise<void> {
  const supabase = await getSupabase()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
}

export async function signOut(): Promise<void> {
  const supabase = await getSupabase()
  await supabase.auth.signOut()
}
