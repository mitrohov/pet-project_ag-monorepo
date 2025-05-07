import { createEntityDeps } from '@/packages/deps'

interface Dependencies {
  apiUrl: string
}

const [useApplicationsDeps, provideApplicationsDeps] = createEntityDeps<Dependencies>()

const provideApplicationsMockDeps = (deps?: Partial<Dependencies>) =>
  provideApplicationsDeps({
    apiUrl: import.meta.env.VITE_API_URL,
    ...deps
  })

export { useApplicationsDeps, provideApplicationsDeps, provideApplicationsMockDeps }
