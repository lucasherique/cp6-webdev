import { Suspense, lazy, useEffect, useState } from 'react'
import { ErrorBoundary } from '../ui/ErrorBoundary'

// A cena 3D (three.js) só é baixada depois que a página ficou ociosa.
const HeroScene = lazy(() => import('./HeroScene'))

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function HeroVisual() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const start = () => setReady(true)
    const w: Partial<Window> = window
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(start, { timeout: 3000 })
      return () => window.cancelIdleCallback(id)
    }
    const id = window.setTimeout(start, 1500)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div className="hero-visual" aria-hidden="true">
      {ready && (
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  )
}
