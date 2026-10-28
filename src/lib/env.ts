export const env = {
  githubUsername: (import.meta.env.VITE_GITHUB_USERNAME as string | undefined) ?? '',
  supabaseUrl: (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? '',
  supabaseAnonKey: (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? '',
  formspreeEndpoint: (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined) ?? '',
}
