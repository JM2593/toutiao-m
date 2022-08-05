import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import '@/assets/fonts/iconfont.css'
import 'vant/lib/index.css'
import 'amfe-flexible/index.min.js'
import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
Vue.use(Vant)
Vue.config.productionTip = false
Vue.filter('formatTime', (time) => {
  return dayjs().to(dayjs(time))
})
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
