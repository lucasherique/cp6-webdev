import { useState } from 'react'
import { useRepos } from '../../hooks/useRepos'
import { useFeaturedNames, useSaveFeatured } from '../../hooks/useFeatured'
import { Button } from '../ui/Button'
import { Spinner } from '../ui/Spinner'
import { StateMessage } from '../ui/StateMessage'
import type { Repo } from '../../types'

function FeaturedEditor({ repos, initial }: { repos: Repo[]; initial: string[] }) {
  const [selected, setSelected] = useState<string[]>(initial)
  const save = useSaveFeatured()

  const toggle = (name: string) =>
    setSelected((cur) => (cur.includes(name) ? cur.filter((n) => n !== name) : [...cur, name]))

  return (
    <div>
      <ul className="list">
        {repos.map((repo) => (
          <li key={repo.id} className="card check-row">
            <label>
              <input
                type="checkbox"
                checked={selected.includes(repo.name)}
                onChange={() => toggle(repo.name)}
              />
              <span>{repo.name}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className="actions">
        <Button loading={save.isPending} onClick={() => save.mutate(selected)}>
          Salvar destaques
        </Button>
        {save.isSuccess && <p role="status">Destaques salvos.</p>}
        {save.isError && (
          <p role="alert" className="field-error">
            Não foi possível salvar.
          </p>
        )}
      </div>
    </div>
  )
}

export function FeaturedPanel() {
  const repos = useRepos()
  const featured = useFeaturedNames()

  if (repos.isLoading || featured.isLoading) return <Spinner label="Carregando projetos" />
  if (repos.error || featured.error) {
    return (
      <StateMessage
        tone="error"
        title="Não foi possível carregar os projetos"
        action={
          <Button
            onClick={() => {
              repos.refetch()
              featured.refetch()
            }}
          >
            Tentar de novo
          </Button>
        }
      />
    )
  }
  if (!repos.data || repos.data.length === 0) {
    return <StateMessage title="Sem projetos para destacar" />
  }
  return <FeaturedEditor repos={repos.data} initial={featured.data ?? []} />
}
