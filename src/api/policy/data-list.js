import request from '@/utils/request'
// 获取数据列表
export function getPolicyDataList (data) {
  return request({
    url: '/eys/data/list',
    method: 'get',
    params: data
  })
}
// 二次检索
export function getDeepDataList (data) {
  return request({
    url: '/eys/text/advancedSearch',
    method: 'post',
    data: data
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
    url: '/eys/text/updateHighWord',
    method: 'put',
    params: {
      ids: data
    }
  })
}
// 文本对比
export function compareText (data) {
  return request({
    url: '/eys/text',
    method: 'post',
    params: {
      ids: data
    }
  })
}
// 行文结构合并下载
export function structMerge (data) {
  return request({
    url: '/eys/text/struct/merge',
    method: 'get',
    params: {
      ids: data
    }
  })
}
// 整篇文章合并下载
export function alltMerge (data) {
  return request({
    url: '/eys/text/all/merge',
    method: 'get',
    params: {
      ids: data
    }
  })
}
