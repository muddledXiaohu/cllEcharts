

export const asyncRouterMap = [
  // {
  //   path: '/user',
  //   component: () => import(/* webpackChunkName: "user" */ '@/components/everyOne.vue'),
  //   redirect: '/user/account',
  //   hidden: true,
  //   meta: { title: 'user' },
  //   name: 'user',
  //   children: [
  //     {
  //       path: 'accountApply',
  //       name: 'accountApply',
  //       component: () => import(/* webpackChunkName: "accountApply" */ '@/views/account/accountApply'),
  //       meta: { title: 'accountApply' }
  //     },
  //     {
  //       path: 'recover',
  //       name: 'recover',
  //       component: undefined
  //     }
  //   ]
  // },

]


/**
 * 基础路由
 * @type { *[] }
 */
 export const constantRouterMap = [
  { path: '/', redirect: '/index' },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login'),
    hidden: true,
    children: []
   },
  
   {
    path: '/index',
    component: () => import(/* webpackChunkName: "index" */ '@/components/everyOne.vue'),
    redirect: '/index/digitalForm',
    hidden: true,
    meta: { title: 'index' },
    name: 'index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import(/* webpackChunkName: "index" */ '@/views/index/index'),
        meta: { title: 'index' }
      },
      {
        path: 'digitalForm',
        name: 'digitalForm',
        component: () => import(/* webpackChunkName: "digitalForm" */ '@/views/index/digitalForm'),
        meta: { title: 'digitalForm' }
      },
      {
        path: 'newFormVisible',
        name: 'newFormVisible',
        component: () => import(/* webpackChunkName: "newFormVisible" */ '@/views/index/newFormVisible'),
        meta: { title: 'newFormVisible' }
      },
      {
        path: 'shipCreate',
        name: 'shipCreate',
        component: () => import(/* webpackChunkName: "shipCreate" */ '@/views/index/components/shipCreate'),
        meta: { title: 'shipCreate' }
      },
      {
        path: 'demo',
        name: 'demo',
        component: () => import(/* webpackChunkName: "demo" */ '@/views/index/demo'),
        meta: { title: 'demo' }
      },
      {
        path: 'indicators',
        name: 'indicators',
        component: () => import(/* webpackChunkName: "indicators" */ '@/views/index/indicators'),
        meta: { title: 'indicators' }
      },
      {
        path: 'chart',
        name: 'chart',
        component: () => import(/* webpackChunkName: "chart" */ '@/views/index/chart'),
        meta: { title: 'chart' }
      },
      {
        path: 'sailingTable',
        name: 'sailingTable',
        component: () => import(/* webpackChunkName: "sailingTable" */ '@/views/index/sailingTable'),
        meta: { title: 'sailingTable' }
      },
      {
        path: 'CIICalculation',
        name: 'CIICalculation',
        component: () => import(/* webpackChunkName: "CIICalculation" */ '@/views/CIIModules/CIICalculation'),
        meta: { title: 'CIICalculation' }
      },
    ]
  },
  // {
  //   // NewCustomer
  //   path: '/NewCustomer',
  //   component: () => import(/* webpackChunkName: "operate" */ '@/views/customer/NewCustomer.vue'),
  //   // redirect: '/NewCustomer',
  //   hidden: true,
  // }

  // {
  //   path: '/404',
  //   component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  // }
]
