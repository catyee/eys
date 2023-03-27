import request from '@/utils/request'
export function getOrgList (data) {
  return request({
    url: 'eys/standardization/list',
    method: 'get',
    params: data
  })
}
export function addOrg (data) {
  return request({
    url: 'eys/standardization/',
    method: 'post',
    data: data
  })
}
export function updateOrg (data) {
  return request({
    url: 'eys/standardization/',
    method: 'put',
    data: data
  })
}

export function deleteOrg (id) {
  return request({
    url: 'eys/standardization/' + id,
    method: 'delete'
  })
}
