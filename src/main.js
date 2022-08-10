import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import '@/assets/fonts/iconfont.css'
import 'vant/lib/index.css'
import '@/style/base.css'
import 'github-markdown-css'
import 'amfe-flexible/index.min.js'
import dayjs from '@/utils/dayjs'
Vue.use(Vant)
Vue.config.productionTip = false

Vue.filter('formatDate', (val) => {
  return dayjs(val).from(dayjs())
})
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
