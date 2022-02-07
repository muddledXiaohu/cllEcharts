import request from '@/utils/request'

const billApi = {
  // 查询客户月账单
  queryMonthly: 'account/statistic/monthly/list',
}
// 查询客户月账单
export function queryMonthly (parameter) {
  return request({
    url: billApi.queryMonthly,
    method: 'POST',
    data: parameter
  })
}
