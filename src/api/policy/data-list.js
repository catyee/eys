import request from '@/utils/request'
export function getPolicyDataList (data) {
  return request({
    url: '/eys/data/list',
    method: 'get',
    params: data
  })
}
