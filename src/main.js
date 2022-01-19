import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import Element from 'element-ui'
import './style/index.less'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './utils/axios.config'
import  Conponent from './components/index.js'


axios.defaults.baseURL ='http://localhost:3000'
Vue.prototype.$axios =axios  //全局使用

Vue.use(Element)
Vue.use(Conponent)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

