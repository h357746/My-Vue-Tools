
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/styles/index.less'
import '@/assets/styles/reset.less'
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import App from './App.vue'
import router from './router'
import {  message } from 'ant-design-vue';
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount('#app')
app.config.globalProperties.$message = message;
