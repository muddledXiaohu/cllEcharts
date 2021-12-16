

export const asyncRouterMap = [
  {
    path: '/openAccount',
    component: () => import(/* webpackChunkName: "user" */ '@/views/account/openAccount'),
    name: 'openAccount',
    meta: { requiresAuth: true }, //页面需要的权限
    children: []
  },
  // {
  //   path: '/user',
  //   component: () => import(/* webpackChunkName: "user" */ '@/components/everyOne.vue'),
  //   redirect: '/user/role',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'role',
  //       name: 'role',
  //       component: () => import(/* webpackChunkName: "user" */ '@/views/permission/role.vue')
  //     }
  //   ]
  // }
]


/**
 * 基础路由
 * @type { *[] }
 */
 export const constantRouterMap = [
  { path: '/', redirect: '/customer' },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login'),
    hidden: true,
    children: []
  },
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "user" */ '@/components/everyOne.vue'),
    redirect: '/user/openAccount',
    hidden: true,
    meta: { title: 'user' },
    name: 'user',
    children: [
      {
        path: 'openAccount',
        name: 'openAccount',
        component: () => import(/* webpackChunkName: "user" */ '@/views/account/openAccount'),
        meta: { title: 'openAccount' }
      },
      {
        path: 'accountNumber',
        name: 'accountNumber',
        component: () => import(/* webpackChunkName: "user" */ '@/views/account/accountNumber'),
        meta: { title: 'accountNumber' }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import(/* webpackChunkName: "user" */ '@/views/permission/role.vue'),
        meta: { title: 'role' }
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },
  {
    path: '/customer',
    component: () => import(/* webpackChunkName: "customer" */ '@/components/everyOne.vue'),
    redirect: '/customer/international',
    hidden: true,
    meta: { title: 'customer' },
    name: 'customer',
    children: [
      {
        path: 'international',
        name: 'international',
        component: () => import(/* webpackChunkName: "customer" */ '@/views/customer/international'),
        meta: { title: 'international' }
      },
      {
        path: 'mine',
        name: 'mine',
        component: () => import(/* webpackChunkName: "customer" */ '@/views/customer/mine'),
        meta: { title: 'mine' }
      }
    ]
  }

  // {
  //   path: '/404',
  //   component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  // }
]
