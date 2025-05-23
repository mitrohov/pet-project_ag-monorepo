import type { DefaultPlugins } from './types'
import { createMemoryHistory, createRouter } from 'vue-router'
import { h } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { Russian } from 'flatpickr/dist/l10n/ru'
import Aura from '@primeuix/themes/aura'

export const defaultPlugins: DefaultPlugins[] = [
  {
    plugin: createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '', component: h('div') }],
    }),
    options: {},
  },
  {
    plugin: createPinia(),
    options: {},
  },
  {
    plugin: PrimeVue,
    options: {
      locale: Russian,
      ripple: true,
      inputStyle: 'outlined',
      theme: {
        preset: Aura,
        light: 'lara-light-green',
        dark: 'lara-light-green',
      },
    },
  },
]
