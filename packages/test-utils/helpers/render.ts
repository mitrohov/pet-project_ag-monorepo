/// <reference types="vite/client" />

import type { Component } from 'vue'
import { render } from 'vitest-browser-vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'
import '@ag/assets/css/common.css'
import { Russian } from 'flatpickr/dist/l10n/ru.js'
import { createPinia } from 'pinia'
import { vi } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'

interface RouteMeta {
  layout: string
}
interface Route {
  path: string
  name: string
  component: () => Component
  meta: RouteMeta
}

vi.mock('import.meta.env', () => ({
  VITE_BASE_LOGIN: import.meta.env.VITE_BASE_LOGIN,
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_BASE_PASSWORD: import.meta.env.VITE_BASE_PASSWORD,
  VITE_NODE_ENV: import.meta.env.VITE_NODE_ENV,
}))

const signInMock = vi.fn().mockResolvedValue({
  id: 0,
  email: 'string',
  iat: 0,
  exp: 0,
  accessToken: 'string',
})

vi.mock('@/packages/api', () => ({
  useApi: () => ({
    auth: {
      signIn: signInMock,
    },
  }),
}))

export function renderWithPlugins(
  component: any,
  options: Record<string, any> = {},
  routes: Route[] = []
) {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: { template: '<div></div>' },
      },
      ...routes,
    ],
  })

  return render(component, {
    global: {
      plugins: [
        createPinia(),
        [
          PrimeVue,
          {
            theme: {
              preset: Aura,
              locale: Russian,
            },
            ripple: true,
            inputStyle: 'outlined',
          },
        ],
        router,
      ],
      ...(options.global || {}),
    },
    ...options,
  })
}
