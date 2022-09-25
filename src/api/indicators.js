import request from '@/utils/request'

const passageway = {
  // 新建行程数据
  createCllNewretown: 'cllNewretown/create',
  // 查询最新最后数据
  cllNewretown: 'cllNewretown',
  // 查询前天的数据
  cllNewretownYesterday: 'cllNewretown/yesterday',
  // 修改行程数据
  cllNewretownModify: 'cllNewretown/modify/',
  // 已上传的数据
  cllNewretownUploaded: 'cllNewretown/paging',
  // 创建船次号
  createShipNo: 'shipNo/create',
  // 查询船次号
  pagingShipNo: 'shipNo/paging',
  // 创建船舶
  createShipping: 'shipping/create',
  // 查询船舶
  pagingShipping: 'shipping/paging',
}
// 新建行程数据
export function createCllNewretown (parameter) {
  return request({
    url: passageway.createCllNewretown,
    method: 'POST',
    data: parameter
  })
}
  // 查询最新最后数据
export function cllNewretown () {
    return request({
      url: passageway.cllNewretown,
      method: 'GET',
    })
}
// 查询前天的数据
export function cllNewretownYesterday () {
    return request({
      url: passageway.cllNewretownYesterday,
      method: 'GET',
    })
}
// 修改行程数据
export function cllNewretownModify (parameter, sameTime) {
  return request({
    url: passageway.cllNewretownModify+sameTime,
    method: 'POST',
    data: parameter
  })
}
// 已上传的数据
export function cllNewretownUploaded (parameter) {
  return request({
    url: passageway.cllNewretownUploaded,
    method: 'POST',
    data: parameter
  })
}

  // 创建船次号
export function createShipNo (parameter) {
  return request({
    url: passageway.createShipNo,
    method: 'POST',
    data: parameter
  })
}
// 查询船次号
export function pagingShipNo (parameter) {
  return request({
    url: passageway.pagingShipNo,
    method: 'POST',
    data: parameter
  })
}
  // 创建船舶
export function createShipping (parameter) {
  return request({
    url: passageway.createShipping,
    method: 'POST',
    data: parameter
  })
}
  // 查询船舶
  export function pagingShipping (parameter) {
    return request({
      url: passageway.pagingShipping,
      method: 'POST',
      data: parameter
    })
  }