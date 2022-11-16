/**
 * 向后端请求用户的菜单，动态生成路由
 */
import { constantRouterMap, asyncRouterMap } from '@/config/router.config'
// import { generatorDynamicRouter } from '@/router/generator-routers'

let arr = [
  {title: '第一版', name: 'index', id: 1, key: 'index', icon: 'team', children:[
    {title:'页面1', name: 'digitalForm', icon: 'user-add', key: '/index/digitalForm'},
    {title:'午报数据', name: 'sailingTable', icon: 'user', key: '/index/sailingTable'},
    // {title:'图表', name: 'chart', icon: 'user', key: '/index/chart'},
  ]},
  // {title: '开户管理', name: 'user', id: 2, key: 'user', icon: 'user-add', children:[
  //   {title: '开户申请', name: 'accountApply', icon: 'user-add', key: '/user/accountApply'},
  //   {title: '主账号', name: 'account', icon: 'user', key: '/user/account'},
  //   {title: '发送账号', name: 'accountJoin', icon: 'user', key: '/user/accountJoin'}
  // ]},
]
const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    routeListArr: arr
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_ROUTERLISTARR: (state, routers) => {
      state.routeListArr = routers
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
          asyncRouterMap.map((item, idx) => {
            const childrenNav = []
            if (item.children && item.children.length != 0) {
              if (item.name == "file") {
                data.map(fileIt => {
                  if (fileIt.url == "/menu/file") {
                    asyncRouterMap[idx] = item
                  }
                })
                return
              }
              listToTree(item.children, data, childrenNav)
              asyncRouterMap[idx].children = childrenNav
            } else {
              const childrenNav = []
              listToTree(item, data, childrenNav)
              asyncRouterMap[idx] = childrenNav
            }
          })
          let xhArr = JSON.parse(JSON.stringify(arr))
          xhArr.map((arritmes, arridx) => {
            if (arritmes.children && arritmes.children.length != 0) {
              if (arritmes.name == "file") {
                let filearr = data.map(fileIt => {
                  if (fileIt.url == "/menu/file") {
                    return arritmes
                  }
                })
                let fileYes = {}
                filearr.forEach(filearrit => {
                  if (filearrit) {
                    fileYes = filearrit
                  }
                })
                xhArr[arridx] = fileYes
                return
              }
              const childrenNav = []
              listToTree(arritmes.children, data, childrenNav)
              xhArr[arridx].children = childrenNav
            }
          })
          commit('SET_ROUTERS', asyncRouterMap)
          commit('SET_ROUTERLISTARR', xhArr)
          resolve()
      })
    }
  }
}
/**
 * 菜单
 * @param list 源数组
 * @param data 用户权限
 */
 const listToTree = (list, data, tree) => {
   list.map(item => {
     data.forEach(dataItem => {
        if (! dataItem.code || dataItem.code == " ") {
          if (item.path == 'customer' && dataItem.url == '/menu/customer') {
            tree.push(list[2])
            tree.push(list[3])
          } else if (item.path == 'dailyGross' && dataItem.url == '/menu/dailyGross') {
            tree.push(list[3])
          } else if (item.path == 'channelBusiness' && dataItem.url == '/menu/channelBusiness') {
            tree.push(list[4])
            tree.push(list[5])
          } else if (item.path == 'account' && dataItem.url == '/menu/account') {
            tree.push(list[6])
            tree.push(list[7])
          } else if (item.path == 'accountApply' && dataItem.url == '/menu/accountApply') {
            tree.push(list[3])
            tree.push(list[8])
          } else if (item.path == 'accountStatistic' && dataItem.url == '/menu/accountStatistic') {
            tree.push(list[1])
          }
          // if (item.name == 'accountStatistic') {
          //   console.log(item);
          // //   // item.path = 'account'
          // }
          if (dataItem.id == '/menu/accountStatistic') {
            console.log(dataItem);
          }
          return dataItem.url == `/menu/${item.name}` ? tree.push(item) : null
        }
     })
    //  if (!permissionId.includes(p.url)) {
    //    return
    //  }
   })
    //  console.log(constantRouterMap);
}


export default permission
