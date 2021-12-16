import request from '@/utils/request'

const userApi = {
  list: 'customer/list',
}

/**
 * login func
 * 
 * @param parameter
 * @returns {*}
 */
export function list (parameter) {
  return request({
    url: userApi.list,
    method: 'post',
    data: parameter
  })
}
