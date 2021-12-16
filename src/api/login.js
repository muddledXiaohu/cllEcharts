import request from '@/utils/request'

const userApi = {
  Login: 'usercenter/auth/token',
  Usercenter: 'usercenter/rolePermission/getByRole'
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
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}
export function usercenter (parameter) {
  return request({
    url: `${userApi.Usercenter}?roleId=${parameter}`,
    method: 'get'
  })
}
