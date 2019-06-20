import request from '@/utils/request'

//添加影厅
export function addScreen(data) {
  return request({
    url: '/api/addScreen',
    method: 'post',
    data
  })
}

//获取影厅
export function getScreen(data) {
  return request({
    url: '/api/getScreen',
    method: 'post',
    data
  })
}

//设置座位
export function addSeat(data) {
  return request({
    url: '/api/addSeat',
    method: 'post',
    data
  })
}

//获取座位
export function getSeat(data) {
  return request({
    url: '/api/getSeat',
    method: 'post',
    data
  })
}
