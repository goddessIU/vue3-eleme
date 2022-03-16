import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import VueSimpleSpinner from 'vue-simple-spinner/src/components/Spinner.vue'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.component('vue-simple-spinner', VueSimpleSpinner)
app.mount('#app')
