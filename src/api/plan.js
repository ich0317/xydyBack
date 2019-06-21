import request from '@/utils/request'

//排期 搜索影片
export function searchFilm(data) {
  return request({
    url: '/api/searchFilm',
    method: 'post',
    data
  })
}

//添加排期
export function addSession(data) {
  return request({
    url: '/api/addSession',
    method: 'post',
    data
  })
}

//获取排期
export function getSession(data) {
  return request({
    url: '/api/getSession',
    method: 'get',
    params:data
  })
}

//删除排期
export function delSession(data) {
  return request({
    url: '/api/delSession',
    method: 'post',
    data
  })
}

//审核排期
export function agreeSession(data) {
  return request({
    url: '/api/agreeSession',
    method: 'post',
    data
  })
}
