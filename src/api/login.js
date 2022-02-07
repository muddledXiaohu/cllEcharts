import request from '@/utils/request'

const loginApi = {
  Login: 'http://192.168.1.41/usercenter/auth/token',
  Usercenter: 'http://192.168.1.41/usercenter/rolePermission/getByRole'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     uuid: '',
 *     device: 'web',
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return request({
    url: loginApi.Login,
    method: 'post',
    data: parameter
  })
}
export function usercenter (parameter) {
  return request({
    url: `${loginApi.Usercenter}?roleId=${parameter}`,
    method: 'get'
  })
}
