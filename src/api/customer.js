import request from '@/utils/request'

const customerApi = {
  list: 'customer/list',
  save: 'customer/save',
  contactsSave: 'constomer/contacts/save',
  // 查询客户列表
  contactsList: 'customer/contacts/list',
  accountJoin:'accountJoin/list',
  // 分配领取客户
  assignCustomer: 'customer/transfer',
  // 批量退回公海
  giveupHighSeas: 'customer/giveup',
  // 删除客户
  customerDelete: 'constomer/contacts/delete'
}

/**
 * list func
 * 
 * @param parameter
 * @returns {*}
 */
export function list (parameter) {
  return request({
    url: customerApi.list,
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
    url: customerApi.save,
    method: 'POST',
    data: parameter
  })
}
export function contactsSave (parameter) {
  return request({
    url: customerApi.contactsSave,
    method: 'POST',
    data: parameter
  })
}
// 查询客户列表
export function contactsList (parameter) {
  return request({
    url: customerApi.contactsList,
    method: 'POST',
    data: parameter
  })
}
export function accountJoin (parameter) {
  return request({
    url: customerApi.accountJoin,
    method: 'POST',
    data: parameter
  })
}
// 分配领取客户
export function assignCustomer (parameter) {
  return request({
    url: customerApi.assignCustomer,
    method: 'POST',
    data: parameter
  })
}
//  批量退回公海
export function giveupHighSeas (parameter) {
  return request({
    url: customerApi.giveupHighSeas,
    method: 'POST',
    data: parameter
  })
}
// 删除
export function customerDelete (parameter) {
  return request({
    url: customerApi.customerDelete,
    method: 'POST',
    data: parameter
  })
}