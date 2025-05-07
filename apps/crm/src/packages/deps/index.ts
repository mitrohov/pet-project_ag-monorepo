import { provideLocal } from './src/provide-local'
import { injectLocal } from './src/inject-local'

export function createEntityDeps<D>(): [() => D, (depsToProvide: D) => void] {
  const key = Symbol('injectable dependencies')

  const useDeps = () => {
    const deps = injectLocal<D>(key)

    if (!deps) {
      throw new Error(`Dependencies are used, but not provided!`)
    }

    return deps as D
  }

  const provideDeps = (depsToProvide: D) => provideLocal(key, depsToProvide)

  return [useDeps, provideDeps]
}
