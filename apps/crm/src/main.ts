import { createPinia } from 'pinia'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css'
import './assets/main.css'
import { Russian } from 'flatpickr/dist/l10n/ru.js'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  locale: Russian,
  ripple: true,
  inputStyle: 'outlined',
  theme: {
    preset: Aura,
    light: 'lara-light-green',
    dark: 'lara-light-green'
}
})
app.mount('#app')
