import { env } from '../lib/env'
import { getSupabase, isSupabaseConfigured } from '../lib/getSupabase'
import type { ContactInput, ContactMessage } from '../types'

/** Salva a mensagem no Supabase (dashboard) e envia por e-mail (Formspree). */
export async function sendContactMessage({ name, email, message }: ContactInput): Promise<void> {
  const saveToDb = async () => {
    const supabase = await getSupabase()
    const { error } = await supabase.from('messages').insert({ name, email, message })
    if (error) throw error
  }

  const sendEmail = async () => {
    if (!env.formspreeEndpoint) throw new Error('FORMSPREE_NOT_CONFIGURED')
    const res = await fetch(env.formspreeEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })
    if (!res.ok) throw new Error('EMAIL_FAILED')
  }

  const results = await Promise.allSettled([
    isSupabaseConfigured ? saveToDb() : Promise.reject(new Error('SUPABASE_NOT_CONFIGURED')),
    sendEmail(),
  ])
  // Só falha se NENHUM dos dois destinos recebeu a mensagem.
  if (results.every((r) => r.status === 'rejected')) throw new Error('SEND_FAILED')
}

export async function listMessages(): Promise<ContactMessage[]> {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as ContactMessage[]
}

export async function setMessageReplied(id: string, replied: boolean): Promise<void> {
  const supabase = await getSupabase()
  const { error } = await supabase.from('messages').update({ replied }).eq('id', id)
  if (error) throw error
}
