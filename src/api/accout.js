import request from '@/utils/request'

const accoutApi = {
  // 查询主账号列表
  masterAccount: 'account/list',
  // 查看主账号明细
  masterAccountDetails: 'account/detail',
  // 查看子账号明细
  subAccountDetails: 'accountJoin/detail',
  // 查看开户申请明细
  accountOpeningDetails: 'account/apply/detail',
}
// 查询主账号列表
export function masterAccount (parameter) {
  return request({
    url: accoutApi.masterAccount,
    method: 'POST',
    data: parameter
  })
}
// 查看主账号明细
export function masterAccountDetails (parameter) {
  return request({
    url: accoutApi.masterAccountDetails+`?id=${parameter}`,
    method: 'GET',
    data: parameter
  })
}
// 查看子账号明细
export function subAccountDetails (parameter) {
  return request({
    url: accoutApi.subAccountDetails+`?id=${parameter}`,
    method: 'GET',
    data: parameter
  })
}
//  查看开户申请明细
export function accountOpeningDetails (parameter) {
  return request({
    url: accoutApi.accountOpeningDetails+`?id=${parameter}`,
    method: 'GET',
    data: parameter
  })
}