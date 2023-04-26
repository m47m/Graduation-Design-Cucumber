import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import echarts from './composables/echart'
import {createPinia} from 'pinia'

const app = createApp(App)

app.config.globalProperties.$echarts = echarts
app.use(router).use(ElementPlus).use(createPinia()).mount('#app')

