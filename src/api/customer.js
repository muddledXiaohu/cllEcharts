import request from '@/utils/request'

const userApi = {
  list: 'customer/list',
  save: 'customer/save',
  contactsSave: 'constomer/contacts/save',
  // 查询客户列表
  contactsList: 'customer/contacts/list',
  AccountJoin:'accountJoin/list',
  MasterAccount: 'account/list',
  // 查看主账号明细
  MasterAccountDetails: 'account/detail',
  // 查看子账号明细
  SubAccountDetails: 'accountJoin/detail',
  // 分配领取客户
  AssignCustomer: '/customer/transfer',
  // 批量退回公海
  giveupHighSeas: '/customer/giveup'
}

/**
 * list func
 * 
 * @param parameter
 * @returns {*}
 */
export function list (parameter) {
  return request({
    url: userApi.list,
    method: 'POST',
    data: parameter
  })
}
/**
 * save func
 * 
 * @param parameter
 * @returns {*}
 */
 export function save (parameter) {
  return request({
    url: userApi.save,
    method: 'POST',
    data: parameter
  })
}
export function contactsSave (parameter) {
  return request({
    url: userApi.contactsSave,
    method: 'POST',
    data: parameter
  })
}
// 查询客户列表
export function contactsList (parameter) {
  return request({
    url: userApi.contactsList,
    method: 'POST',
    data: parameter
  })
}
export function accountJoin (parameter) {
  return request({
    url: userApi.AccountJoin,
    method: 'POST',
    data: parameter
  })
}
// 查询主账号列表
export function MasterAccount (parameter) {
  return request({
    url: userApi.MasterAccount,
    method: 'POST',
    data: parameter
  })
}
// 查看主账号明细
export function MasterAccountDetails (parameter) {
  return request({
    url: userApi.MasterAccountDetails+`?id=${parameter}`,
    method: 'GET',
    data: parameter
  })
}
// 查看子账号明细
export function SubAccountDetails (parameter) {
  return request({
    url: userApi.SubAccountDetails+`?id=${parameter}`,
    method: 'GET',
    data: parameter
  })
}
// 分配领取客户
export function AssignCustomer (parameter) {
  return request({
    url: userApi.AssignCustomer,
    method: 'POST',
    data: parameter
  })
}
//  批量退回公海
export function giveupHighSeas (parameter) {
  return request({
    url: userApi.giveupHighSeas,
    method: 'POST',
    data: parameter
  })
}