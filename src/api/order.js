import request from '@/utils/request'

//获取影院详情
export function getOrder(data) {
  return request({
    url: '/api/getOrder',
    method: 'get',
    params:data
  })
}


