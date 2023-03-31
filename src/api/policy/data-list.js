import request from '@/utils/request'
// 获取数据列表
export function getPolicyDataList (data) {
  return request({
    url: '/eys/data/list',
    method: 'get',
    params: data
  })
}
// 获取政策信息
export function getPolicyData (id) {
  return request({
    url: '/eys/data/' + id,
    method: 'get'
  })
}
// 获取文件详情
export function getPolicyDetailData (id) {
  return request({
    url: '/eys/file/' + id,
    method: 'get'
  })
}
// 删除数据
export function deleteData (id) {
  return request({
    url: '/eys/data/' + id,
    method: 'delete'
  })
}
// 数据清洗
export function dataClear (id) {
  return request({
    url: '/eys/text/',
    method: 'put',
    params: {
      ids: id
    }
  })
}
// 修改政策文本
export function updateFileData (data) {
  return request({
    url: '/eys/file/',
    method: 'put',
    data
  })
}
// 修改数据
export function updatePolicyData (data) {
  return request({
    url: '/eys/data/',
    method: 'put',
    data: data
  })
}

// 更新高频词
export function updateWords (data) {
  return request({
    url: '/eys/data/',
    method: 'put',
    data: data
  })
}
