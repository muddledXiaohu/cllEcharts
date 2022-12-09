import request from '@/utils/request'

const passageway = {
  // 新建行程数据
  createAim: 'aim/create',
  // 查询最新最后数据
  aimYester: 'aimYester',
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
  // 查询船舶分页
  shippingPagePaging: 'shippingPage/paging',
  // 最后的行程数据
  cllNewretownLast: 'cllNewretown/last',
  // 上传
  analysisExcel: 'analysisExcel',
  // 查询上传内容
  pagingAim: 'aim/paging',
  // 查询船次号最后一次数据
  aimYesterday: 'aimYesterday',
  // 查询上次结束航次号
  shipNoYesterday: 'shipNoYesterday'
}
// 新建行程数据
export function createAim (parameter) {
  return request({
    url: passageway.createAim,
    method: 'POST',
    data: parameter
  })
}
  // 查询最新最后数据
export function aimYester (parameter) {
    return request({
      url: passageway.aimYester,
      method: 'POST',
      data: parameter
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
export function cllNewretownModify (parameter) {
  return request({
    url: passageway.cllNewretownModify,
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
  
  // 查询船舶分页
  export function shippingPagePaging (parameter) {
    return request({
      url: passageway.shippingPagePaging,
      method: 'POST',
      data: parameter
    })
  }

// 最后的行程数据
export function cllNewretownLast (parameter) {
  return request({
    url: passageway.cllNewretownLast,
    method: 'POST',
    data: parameter
  })
}
// 上传
export function analysisExcel (parameter) {
  return request({
    url: passageway.analysisExcel,
    method: 'POST',
    data: parameter,
    headers: { 
      'Content-Type': 'multipart/form-data'
    },
  })
}

// 查询上传内容
export function pagingAim (parameter) {
  return request({
    url: passageway.pagingAim,
    method: 'POST',
    data: parameter
  })
}
// 查询船次号最后一次数据
export function aimYesterday (parameter) {
  return request({
    url: passageway.aimYesterday,
    method: 'POST',
    data: parameter
  })
}
// 查询上次结束航次号
export function shipNoYesterday () {
  return request({
    url: passageway.shipNoYesterday,
    method: 'GET',
  })
}