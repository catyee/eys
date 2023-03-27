import request from '@/utils/request'
export function getSightWords (data) {
  return request({
    url: '/eys/word/list',
    method: 'get',
    params: data
  })
}
export function deleteWord (id) {
  return request({
    url: '/eys/word/' + id,
    method: 'delete'
  })
}
export function addWords (data) {
  return request({
    url: 'eys/word/batch/add',
    method: 'post',
    data
  })
}
export function updateWord (data) {
  return request({
    url: 'eys/word/',
    method: 'put',
    data: data
  })
}
