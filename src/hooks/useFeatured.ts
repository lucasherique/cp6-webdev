import { useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getFeaturedNames, saveFeaturedNames } from '../services/featured'
import { isSupabaseConfigured } from '../lib/getSupabase'
import { useRepos } from './useRepos'
import type { Repo } from '../types'

export function useFeaturedNames() {
  return useQuery({
    queryKey: ['featured-names'],
    queryFn: getFeaturedNames,
    enabled: isSupabaseConfigured,
    retry: false,
  })
}

/** Projetos da home: os marcados no dashboard; se não houver, os mais recentes. */
export function useFeaturedRepos(limit = 3) {
  const repos = useRepos()
  const featured = useFeaturedNames()

  const data = useMemo<Repo[] | undefined>(() => {
    if (!repos.data) return undefined
    const picked = (featured.data ?? [])
      .map((name) => repos.data.find((r) => r.name === name))
      .filter((r): r is Repo => Boolean(r))
    return (picked.length > 0 ? picked : repos.data).slice(0, limit)
  }, [repos.data, featured.data, limit])

  return {
    data,
    isLoading: repos.isLoading || featured.isLoading,
    error: repos.error,
    refetch: repos.refetch,
  }
}

export function useSaveFeatured() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: saveFeaturedNames,
    onSuccess: () => client.invalidateQueries({ queryKey: ['featured-names'] }),
  })
}
