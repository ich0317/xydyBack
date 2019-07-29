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

//获取用户列表
export function getUserList(data) {
  return request({
    url: '/api/getUserList',
    method: 'get',
    params:data
  })
}


