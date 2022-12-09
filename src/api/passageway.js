import request from '@/utils/request'

const passageway = {
  // 查询通道商列表
  channelBusiness: 'channelBusiness/list',
  // 冻结通道商
  freezeChannelBusiness : 'channelBusiness/freeze',
  // 恢复通道商
  recoverChannelBusiness: 'channelBusiness/recover',
  // 查询通道列表
  channel: 'channel/list',
  // 新建/修改通道
  savePassageway: 'channel/save',
  // 新建/修改通道商
  saveChannelBusiness: 'channelBusiness/save',
  // 删除通道
  deleteChannels : 'channel/delete',
  // 通道调价
  saveChannelPrice: 'channelPrice/save',
  // 查询调价记录
  listChannelPrice: 'channelPrice/list',
  // 上传附件
  uploadFile: 'file/upload',
  // 停用通道
  freezeChannel: 'channel/freeze',
  // 启用通道
  recoverChannel: 'channel/recover',
  // 数据分页
  calculationPaging: 'calculation/paging'
}
// 查询通道商列表
export function channelBusiness (parameter) {
  return request({
    url: passageway.channelBusiness,
    method: 'POST',
    data: parameter
  })
}
// 冻结通道商
export function freezeChannelBusiness (parameter) {
  return request({
    url: `${passageway.freezeChannelBusiness}/${parameter}`,
    method: 'GET'
  })
}
// 恢复通道商
  export function recoverChannelBusiness (parameter) {
    return request({
      url: `${passageway.recoverChannelBusiness}/${parameter}`,
      method: 'GET'
    })
  }
// 查询通道列表
export function channel (parameter) {
  return request({
    url: passageway.channel,
    method: 'POST',
    data: parameter
  })
}
// 新建/修改通道
export function savePassageway (parameter) {
  return request({
    url: passageway.savePassageway,
    method: 'POST',
    data: parameter
  })
}
// 新建/修改通道商
export function saveChannelBusiness (parameter) {
  return request({
    url: passageway.saveChannelBusiness,
    method: 'POST',
    data: parameter
  })
}
// 删除通道
export function deleteChannels (parameter) {
  return request({
    url: passageway.deleteChannels,
    method: 'POST',
    data: parameter
  })
}
// 通道调价
export function saveChannelPrice (parameter) {
  return request({
    url: passageway.saveChannelPrice,
    method: 'POST',
    data: parameter
  })
}
// 查询调价记录
export function listChannelPrice (parameter) {
  return request({
    url: passageway.listChannelPrice,
    method: 'POST',
    data: parameter
  })
}
// 上传附件
export function uploadFiles (parameter) {
  return request({
    url: passageway.uploadFile,
    method: 'POST',
    data: parameter,
    headers: { 
      'Content-Type': 'multipart/form-data'
    },
  })
}
  // 停用通道
  export function freezeChannel (parameter) {
    return request({
      url: `${passageway.freezeChannel}/${parameter}`,
      method: 'GET'
    })
  }
  // 启用通道
  export function recoverChannel (parameter) {
    return request({
      url: `${passageway.recoverChannel}/${parameter}`,
      method: 'GET'
    })
  }
  // 数据分页
  export function calculationPaging (parameter) {
    return request({
      url: passageway.calculationPaging,
      method: 'POST',
      data: parameter
    })
  }