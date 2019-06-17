import request from '@/utils/request'

//添加影片
export function addFilm(data) {
  return request({
    url: '/api/addFilm',
    method: 'post',
    data
  })
}
//获取影片
export function getFilmList(data) {
  return request({
    url: '/api/getFilmList',
    method: 'post',
    data
  })
}

//获取详情
export function getFilmDetail(data) {
  return request({
    url: '/api/getFilmDetail',
    method: 'get',
    params:data
  })
}

//删除影片
export function delFilm(data) {
  return request({
    url: '/api/delFilm',
    method: 'post',
    data
  })
}