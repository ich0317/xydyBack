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

