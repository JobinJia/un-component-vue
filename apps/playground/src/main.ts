import { createApp } from 'vue'
import NaiveUi from 'naive-ui'
import AntD from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

// import { createMUI } from 'shuimo-ui';
// import 'shuimo-ui/dist/style.css';
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import TDesign from 'tdesign-vue-next'
import App from './App.vue'
import 'tdesign-vue-next/es/style/index.css'

const app = createApp(App)
app.use(NaiveUi)
app.use(AntD)
// app.use(ElementPlus)
// app.use(createMUI())
app.use(TDesign)

app.mount('#app')
