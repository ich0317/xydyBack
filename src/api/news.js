import request from '@/utils/request'

//添加新闻
export function addNews(data) {
  return request({
    url: '/api/addNews',
    method: 'post',
    data
  })
}
//获取新闻列表
export function getNewsList(data) {
  return request({
    url: '/api/getNewsList',
    method: 'get',
    params:data
  })
}
//获取新闻详情
export function getNewsDetail(data) {
  return request({
    url: '/api/getNewsDetail',
    method: 'get',
    params:data
  })
}
//删除
export function delNews(data) {
  return request({
    url: '/api/delNews',
    method: 'post',
    data
  })
}
