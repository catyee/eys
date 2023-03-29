import request from '@/utils/request'
export function getPolicyDataList (data) {
  return request({
    url: '/eys/data/list',
    method: 'get',
    params: data
  })
}
export function getPolicyData (id) {
  return request({
    url: '/eys/data/' + id,
    method: 'get'
  })
}

export function getPolicyDetailData (id) {
  return request({
    url: '/eys/file/' + id,
    method: 'get'
  })
}
export function deleteData (id) {
  return request({
    url: '/eys/data/' + id,
    method: 'delete'
  })
}
export function dataClear (id) {
  return request({
    url: '/eys/text/',
    method: 'put',
    params: {
      ids: id
    }
  })
}
