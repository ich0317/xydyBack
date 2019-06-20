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
    method: 'post',
    data
  })
}
