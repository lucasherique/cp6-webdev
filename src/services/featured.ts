import { getSupabase } from '../lib/getSupabase'

export async function getFeaturedNames(): Promise<string[]> {
  const supabase = await getSupabase()
  const { data, error } = await supabase.from('featured_repos').select('repo_name')
  if (error) throw error
  return (data ?? []).map((row: { repo_name: string }) => row.repo_name)
}

export async function saveFeaturedNames(names: string[]): Promise<void> {
  const supabase = await getSupabase()
  const { error: delError } = await supabase.from('featured_repos').delete().neq('repo_name', '')
  if (delError) throw delError
  if (names.length === 0) return
  const { error } = await supabase
    .from('featured_repos')
    .insert(names.map((repo_name) => ({ repo_name })))
  if (error) throw error
}
