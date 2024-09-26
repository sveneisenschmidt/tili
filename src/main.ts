import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { safariFix } from './safari-fix'

import deDE from './../locales/en-US.json'
import enUS from './../locales/de-DE.json'

import App from './App.vue'
import router from './router'

const i18n = createI18n({
  locale: 'de-DE',
  fallbackLocale: 'en-US',
  messages: {
    'en-US': deDE,
    'de-DE': enUS
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)

app.mount('#app')

safariFix()
