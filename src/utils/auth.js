import Cookies from 'js-cookie'

export function getToken(keyName) {
  return Cookies.get(keyName)
}

export function setToken(keyName, token) {
  return Cookies.set(keyName, token, { expires: 1 })
}

export function removeToken(keyName) {
  return Cookies.remove(keyName)
}
