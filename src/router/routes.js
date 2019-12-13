import Layout from '@/views/Layout'

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/demo-home', // 重定向
    children: [
      {
        path: '/demo-home',
        name: 'home',
        meta: {
          title: '主页'
        },
        component: () => import('@/views/demo-home')
      },
      {
        path: '/a-page',
        name: 'a-page',
        meta: {
          title: 'A页'
        },
        component: () => import('@/views/demo-a-page')
      },
      {
        path: '/b-page',
        name: 'b-page',
        meta: {
          title: 'B页'
        },
        component: () => import('@/views/demo-b-page')
      },
      {
        path: '/c-page',
        name: 'c-page',
        meta: {
          title: 'C页'
        },
        component: () => import('@/views/demo-c-page')
      },
      {
        path: '/d-page',
        name: 'd-page',
        meta: {
          title: 'D页',
          keepAlive: true // 需要被缓存
        },
        component: () => import('@/views/demo-d-page')
      },
      {
        path: '/e-page',
        name: 'e-page',
        meta: {
          title: 'E页'
        },
        component: () => import('@/views/demo-e-page')
      }
    ]
  }
]
export default routes