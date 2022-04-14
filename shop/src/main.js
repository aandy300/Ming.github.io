import { createApp } from 'vue'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
// 表單驗證 vee-validate 系列
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate' // 載入 vee-validate 的 fumc()
import { required, email, min, max } from '@vee-validate/rules' // 載入規則 - 解構出需要的部分
// import AllRules from '@vee-validate/rules' // 載入規則 - 全部規則ver
import { localize, setLocale } from '@vee-validate/i18n' // 載入多語系func() - 語系、設置語系
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json' // 繁體中文語言包
// 表單驗證 vee-validate 系列 結束
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'

// VeeValidate 使用和相關設定
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 啟用 中文語系
  validateOnInput: true // 輸入文字時立刻驗證
})

// 設定預設語系
setLocale('zh_TW')
// 規則 設置
defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
// 全部規則ver - 用ˋforeach設置所有規則
// Object.keys(AllRules).forEach((rule) => {
    // defineRule(rule, AllRules[rule]);
// });

const app = createApp(App)
app.use(router)
app.use(VueAxios, axios)
app.component('Form', Form) // 使用的時候得用大寫 不然會判定成 html的form
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
