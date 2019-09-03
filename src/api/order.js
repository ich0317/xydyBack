import request from '@/utils/request'

// 获取订单列表
export function getOrder(data) {
  return request({
    url: '/api/getOrder',
    method: 'get',
    params: data
  })
}

// 获取订单详情
export function getOrderDetail(data) {
  return request({
    url: '/api/getOrderDetail',
    method: 'get',
    params: data
  })
}

