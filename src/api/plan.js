import request from '@/utils/request'

//排期 搜索影片
export function searchFilm(data) {
  return request({
    url: '/api/searchFilm',
    method: 'post',
    data
  })
}
