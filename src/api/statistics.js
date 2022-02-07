import request from '@/utils/request'

const statisticsApi = {
  dGrossProfit: 'profit/gross/list',
  dDailyProfit: 'profit/daily/list'
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
export function dGrossProfit (parameter) {
  return request({
    url: statisticsApi.dGrossProfit,
    method: 'post',
    data: parameter
  })
}
// dDailyProfit
export function dDailyProfit (parameter) {
  return request({
    url: statisticsApi.dDailyProfit,
    method: 'post',
    data: parameter
  })
}