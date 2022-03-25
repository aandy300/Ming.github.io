import { createApp } from 'vue'
import 'bootstrap'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(Vueaxios, axios) // 這個順序要注意 不然會噴錯，Vueaxios 在之前 如果在之前會噴 Uncaught RangeError: Maximum call stack size exceeded 調用過多 線程卡住
app.mount('#app')
