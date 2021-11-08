

export const asyncRouterMap = [
]


/**
 * 基础路由
 * @type { *[] }
 */
 export const constantRouterMap = [
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "user" */ './everyOne.vue'),
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  // {
  //   path: '/404',
  //   component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  // }
]
