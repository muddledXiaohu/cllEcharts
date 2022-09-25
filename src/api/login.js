import request from '@/utils/request'

const loginApi = {
  Login: 'user/login',
  // Login: 'https://oa.wxxsxx.com/usercenter/auth/token',
  Usercenter: 'u/getByRole'
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
    url: `${loginApi.Usercenter}?roleId=${parameter}&type=CRM`,
    method: 'get'
  })
}
