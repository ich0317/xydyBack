import request from '@/utils/request'

//添加影院
export function addCinema(data) {
  return request({
    url: '/api/addCinema',
    method: 'post',
    data
  })
}

//获取影院列表
export function getCinema(data) {
  return request({
    url: '/api/getCinema',
    method: 'get',
    params:data
  })
}

//获取影院详情
export function getCinemaDetail(data) {
  return request({
    url: '/api/getCinemaDetail',
    method: 'get',
    params:data
  })
}

//删除影院
export function delCinema(data) {
  return request({
    url: '/api/delCinema',
    method: 'post',
    data
  })
}
