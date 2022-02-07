

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
        path: 'mainAccountNumber',
        name: 'mainAccountNumber',
        component: () => import(/* webpackChunkName: "user" */ '@/views/account/mainAccountNumber'),
        meta: { title: 'mainAccountNumber' }
      },
      {
        path: 'sonAccountNumber',
        name: 'sonAccountNumber',
        component: () => import(/* webpackChunkName: "user" */ '@/views/account/sonAccountNumber'),
        meta: { title: 'sonAccountNumber' }
      },
      {
        path: 'newOpenAccoint',
        name: 'newOpenAccoint',
        component: () => import(/* webpackChunkName: "user" */ '@/views/account/newOpenAccoint.vue'),
        meta: { title: 'newOpenAccoint' }
      },
      // changeOpenAccoint
      {
        path: 'changeOpenAccoint',
        name: 'changeOpenAccoint',
        component: () => import(/* webpackChunkName: "user" */ '@/views/account/changeOpenAccoint.vue'),
        meta: { title: 'changeOpenAccoint' }
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
      },
      {
        path: 'NewCustomer',
        name: 'NewCustomer',
        component: () => import(/* webpackChunkName: "customer" */ '@/views/customer/NewCustomer'),
        meta: { title: 'NewCustomer' },
      },
      {
        path: 'details',
        name: 'details',
        component: () => import(/* webpackChunkName: "customer" */ '@/views/customer/details'),
        meta: { title: 'details' },
      }
    ]
  },
  {
    path: '/statistics',
    component: () => import(/* webpackChunkName: "statistics" */ '@/components/everyOne.vue'),
    redirect: '/statistics/dayGrossProfit',
    hidden: true,
    meta: { title: 'statistics' },
    name: 'statistics',
    children: [
      {
        path: 'dayGrossProfit',
        name: 'dayGrossProfit',
        component: () => import(/* webpackChunkName: "statistics" */ '@/views/statistics/dayGrossProfit'),
        meta: { title: 'dayGrossProfit' }
      },
      // dayProfit
      {
        path: 'dayProfit',
        name: 'dayProfit',
        component: () => import(/* webpackChunkName: "statistics" */ '@/views/statistics/dayProfit'),
        meta: { title: 'dayProfit' }
      },
      {
        path: 'userDayGrossP',
        name: 'userDayGrossP',
        component: () => import(/* webpackChunkName: "statistics" */ '@/views/statistics/userDayGrossP'),
        meta: { title: 'userDayGrossP' }
      },
    ]
  },
  {
    path: '/bill',
    component: () => import(/* webpackChunkName: "bill" */ '@/components/everyOne.vue'),
    redirect: '/bill/MonthlyBill',
    hidden: true,
    meta: { title: 'bill' },
    name: 'bill',
    children: [
      {
        path: 'MonthlyBill',
        name: 'MonthlyBill',
        component: () => import(/* webpackChunkName: "bill" */ '@/views/bill/MonthlyBill'),
        meta: { title: 'MonthlyBill' }
      },
      {
        path: 'WriteOffMBill',
        name: 'WriteOffMBill',
        component: () => import(/* webpackChunkName: "bill" */ '@/views/bill/WriteOffMBill'),
        meta: { title: 'WriteOffMBill' }
      },
      {
        path: 'Collection',
        name: 'Collection',
        component: () => import(/* webpackChunkName: "bill" */ '@/views/bill/Collection'),
        meta: { title: 'Collection' }
      },
      {
        path: 'Invoicing',
        name: 'Invoicing',
        component: () => import(/* webpackChunkName: "bill" */ '@/views/bill/Invoicing'),
        meta: { title: 'Invoicing' }
      },
      {
        path: 'passagewayMBill',
        name: 'passagewayMBill',
        component: () => import(/* webpackChunkName: "bill" */ '@/views/bill/passagewayMBill'),
        meta: { title: 'passagewayMBill' }
      },
      {
        path: 'passagewayWriteOffMB',
        name: 'passagewayWriteOffMB',
        component: () => import(/* webpackChunkName: "bill" */ '@/views/bill/passagewayWriteOffMB'),
        meta: { title: 'passagewayWriteOffMB' }
      },
    ]
  },
  {
    path: '/passageway',
    component: () => import(/* webpackChunkName: "passageway" */ '@/components/everyOne.vue'),
    redirect: '/passageway/merchant',
    hidden: true,
    meta: { title: 'passageway' },
    name: 'passageway',
    children: [
      {
        path: 'merchant',
        name: 'merchant',
        component: () => import(/* webpackChunkName: "passageway" */ '@/views/passageway/merchant'),
        meta: { title: 'merchant' }
      },
      {
        path: 'Conservation',
        name: 'Conservation',
        component: () => import(/* webpackChunkName: "passageway" */ '@/views/passageway/Conservation'),
        meta: { title: 'Conservation' }
      },
      {
        path: 'ConservationEchats',
        name: 'ConservationEchats',
        component: () => import(/* webpackChunkName: "passageway" */ '@/views/passageway/ConservationEchats'),
        meta: { title: 'ConservationEchats' }
      },
    ]
  },
  {
    path: '/operate',
    component: () => import(/* webpackChunkName: "operate" */ '@/components/everyOne.vue'),
    redirect: '/operate/ComplaintRecord',
    hidden: true,
    meta: { title: 'operate' },
    name: 'operate',
    children: [
      {
        path: 'ComplaintRecord',
        name: 'ComplaintRecord',
        component: () => import(/* webpackChunkName: "operate" */ '@/views/operate/ComplaintRecord'),
        meta: { title: 'ComplaintRecord' }
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
