import Vue from 'vue'
import Router from 'vue-router'

import routes from './routes'

Vue.use(Router)

/**
 * 获取网站的基准路径
 */
const getAbsolutePath = () => {
  const path = window.location.pathname
  return path.substring(0, path.lastIndexOf('/') + 1)
}

// if (isDev()) {
//   routes.push(
//     {
//       name: 'comp',
//       path: '/comp',
//       component: () => import('@/components/demo')
//     },
//     {
//       name: 'svg',
//       path: '/svg',
//       component: () => import('@/icons/svg-view.vue')
//     }
//   )
// }

const router = new Router({
  mode: 'hash',
  base: getAbsolutePath(),
  routes
})
export default router
// const LOGIN_PAGE_PATH = '/login'
/**
 * 开启路由守卫
 */
// router.beforeEach((to, from, next) => {
//     // cookie上存了token，可以不用登录
//     const TokenKey = 'DME-Token'
//     const token = getToken(TokenKey)
//     if (token) {
//       // 如果要跳转的页面是登录页，强制跳转到根页面
//       if (to.path === LOGIN_PAGE_PATH) {
//         next({ path: '/' })
//       }
//       next()
//     } else {
//       // 没存就跳转到登录页面
//       if (to.path !== LOGIN_PAGE_PATH) {
//         next({
//           path: LOGIN_PAGE_PATH
//         })
//       }
//       next()
//     }
//   })
