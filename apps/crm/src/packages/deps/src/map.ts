import type { getCurrentInstance } from 'vue'

export const localProvidedStateMap = new WeakMap<
  NonNullable<NonNullable<ReturnType<typeof getCurrentInstance>>['proxy']>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<string | symbol, any>
>()
