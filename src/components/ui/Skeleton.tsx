import type { CSSProperties } from 'react'

export function Skeleton({ width, height = '1em' }: { width?: string; height?: string }) {
  const style: CSSProperties = { width, height }
  return <span className="skeleton" style={style} aria-hidden="true" />
}
