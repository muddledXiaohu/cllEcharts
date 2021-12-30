import request from '@/utils/request'

const userApi = {
  // 查询开户申请列表
  applicationList: 'account/apply/list',
}

/**
 * list func
 * 
 * @param parameter
 * @returns {*}
 */
export function applicationList (parameter) {
  return request({
    url: userApi.applicationList,
    method: 'POST',
    data: parameter
  })
}