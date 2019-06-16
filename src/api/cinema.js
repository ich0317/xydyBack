import request from '@/utils/request'

//添加学校
export function addCollege(data) {
  return request({
    url: '/api/addCollege',
    method: 'post',
    data
  })
}
//获取学校
export function getCollegeList(data) {
  return request({
    url: '/api/getCollegeList',
    method: 'get',
    params:data
  })
}
//删除学校
export function delCollege(data) {
  return request({
    url: '/api/delCollege',
    method: 'post',
    data
  })
}

//添加影院
export function addCinema(data) {
  return request({
    url: '/api/addCinema',
    method: 'post',
    data
  })
}

//获取影院
export function getCinemaList(data) {
  return request({
    url: '/api/getCinemaList',
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
