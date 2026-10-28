import { env } from './env'

export const isSupabaseConfigured = Boolean(env.supabaseUrl && env.supabaseAnonKey)

/** Carrega o SDK do Supabase sob demanda, fora do pacote inicial. */
export async function getSupabase() {
  if (!isSupabaseConfigured) throw new Error('SUPABASE_NOT_CONFIGURED')
  const { supabase } = await import('./supabase')
  return supabase
}
