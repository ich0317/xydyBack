/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * 个位数补0
 * @param {(number|string)}
 */
export function to0(n) {
  return n * 1 < 10 ? '0' + n : n
}

/**
 * 时间戳或GMT转时间
 * @param {(string | dateGMT),string}
 * timeStamp 时间戳或GMT格式日期
 * format = YMD => 年-月-日 , Y=> 年 , M=>月 , D=>日 , YM => 年-月 , hms=> 时:分:秒 , YMDhms=> 年-月-日 时:分:秒 , YMDhm=> 年-月-日 时:分
 */
export const stampToTime = (date, format = 'YMDhms') => {
  let getDate = null

  if (Object.prototype.toString.call(date) === '[object Date]') {
    // GMT
    getDate = date
  } else {
    // 时间戳
    getDate = date / 10000000000 < 1 ? date * 1000 : date
  }

  const oDate = new Date(getDate)
  const Y = oDate.getFullYear()
  const M = to0(oDate.getMonth() + 1)
  const D = to0(oDate.getDate())
  const h = to0(oDate.getHours())
  const m = to0(oDate.getMinutes())
  const s = to0(oDate.getSeconds())

  const oMap = new Map([
    ['Y', Y],
    ['M', M],
    ['D', D],
    ['h', h],
    ['hm', `${h}:${m}`],
    ['hms', `${h}:${m}:${s}`],
    ['YM', `${Y}-${M}`],
    ['YMD', `${Y}-${M}-${D}`],
    ['YMDhms', `${Y}-${M}-${D} ${h}:${m}:${s}`],
    ['YMDhm', `${Y}-${M}-${D} ${h}:${m}`]
  ])
  return oMap.get(format)
}

/**
 * 时间转时间戳
 */
export const timeToStamp = time => {
  const newTime = time.replace(/-/g, '/')
  return new Date(newTime).getTime()
}

/**
 * 数组里对象删除相同元素
 * @param {array ,string, [object|string]}
 * arr需要去重的数组  key对象里需要对比的 键 名  obj要对比的对象或者字符串
 */
export const rmSameObj = (arr, key, obj) => {
  const _obj = obj[key] ? obj[key] : obj
  let _del = ''

  arr.forEach((v, i) => {
    if (v[key] === _obj) {
      _del = arr.splice(i, 1)
    }
  })
  return _del
}

/**
 * 数组对象查重
 * @param {array, object, string}
 *
 */
export const findInArr = (arr, newObj, key) => {
  let i = 0
  for (i; i < arr.length; i++) {
    if (arr[i][key] == newObj[key]) {
      return i
    }
  }
  return -1
}

/**
 * 整数数字后补.0
 * @param {number} n 数字
 */
export const integerAdd0 = n => /^[1-9]{1,}$/.test(Number(n)) ? (n + '.0') : n
