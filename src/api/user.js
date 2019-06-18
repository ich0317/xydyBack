import request from '@/utils/request'
//登录
export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}
//登出
export function logout(data) {
  return request({
    url: '/api/logout',
    method: 'post',
    data
  })
}
