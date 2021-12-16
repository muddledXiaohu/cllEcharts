// eslint-disable-next-line
import * as loginService from '@/api/login'
// 前端路由表
import { asyncRouterMap } from '@/config/router.config'

/**
 * 动态生成菜单
 * @param roleId
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = roleId => {
  return new Promise((resolve, reject) => {
    loginService
      .usercenter(roleId)
      .then(res => {
        const { data } = res
//         const menuNav = []
        const childrenNav = []
        //      后端数据, 根级树数组,  根级 PID
        listToTree(data, childrenNav)
        // console.log(asyncRouterMap);
        resolve(asyncRouterMap)
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 */
const listToTree = (list, tree) => {
    // console.log(list, tree);
    
    list.forEach(item => {
        if (item.url == '/menu/workschedule') {
            const child = {
              ...item,
              children: []
            }
            // 删掉不存在 children 值的属性
            if (child.children.length <= 0) {
              delete child.children
            }
            tree.push(child)
        }
    })
}
