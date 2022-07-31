import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 路由懒加载
// 当转换路径时候再去请求页面，懒加载页面
// 优化首屏加载速度
const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    redirect: '/ ',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import('@/views/Video')
      },
      {
        path: '/my',
        component: () => import('@/views/My')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
