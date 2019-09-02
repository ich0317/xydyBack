/**
 * 初始化座位图
 * @param { Object } seatInit 创建座位参数集合
 */
export const initSeatMap = seatInit => {
  const { row, col, rowSort, colSort, screen_id } = seatInit
  let sort = rowSort + colSort
  let markRow = []
  let markCol = []
  //座位图坐标顺序  t上 b下 l左 r右
  switch (sort) {
    case 'tblr':
      return initTblr()
      break;
    case 'tbrl':
      return initTbrl()
      break;
    case 'btlr':
      return initBtlr()
      break;
    case 'btrl':
      return initBtrl()
      break;
  }

  function initTblr() {
    const json = {}
    let i = null;
      let j = null
    for (i = 0; i < row; i++) {
      const rowArr = []
      markRow.push({ k: i + 1, is_show: 1 })
      for (j = 0; j < col; j++) {
        rowArr.push({
          seat_col: j + 1,
          seat_row: i + 1,
          graph_col: j,
          graph_row: i,
          fixed_x: i + 1,
          fixed_y: j + 1,
          seat_status: 0,
          is_show: 1,
          screen_id
        })

        markCol.push({ k: j + 1, is_show: 1 })
      }
      json[i] = rowArr
    }
    return {
      seats: json,
      markRow,
      markCol: rmSame(markCol, 'k')
    }
  }

  function initTbrl() {
    const json = {}
    let i = null;
      let j = null
    for (i = 0; i < row; i++) {
      const rowArr = []
      markRow.push({ k: i + 1, is_show: 1 })
      for (j = col; j > 0; j--) {
        rowArr.push({
          seat_col: j,
          seat_row: i + 1,
          graph_col: col - j,
          graph_row: i,
          fixed_x: i + i + 1,
          fixed_y: j + j,
          seat_status: 0,
          is_show: 1,
          screen_id
        })

        markCol.push({ k: j, is_show: 1 })
      }
      json[i] = rowArr
    }
    return {
      seats: json,
      markRow,
      markCol: rmSame(markCol, 'k')
    }
  }

  function initBtlr() {
    const json = {}
    let i = null;
      let j = null
    for (i = row; i > 0; i--) {
      const rowArr = []
      markRow.push({ k: i, is_show: 1 })

      for (j = 0; j < col; j++) {
        rowArr.push({
          seat_col: j + 1,
          seat_row: i,
          graph_col: j,
          graph_row: row - i,
          fixed_x: i,
          fixed_y: j + 1,
          seat_status: 0,
          is_show: 1,
          screen_id
        })

        markCol.push({ k: j + 1, is_show: 1 })
      }
      json[row - i] = rowArr
    }

    return {
      seats: json,
      markRow,
      markCol: rmSame(markCol, 'k')
    }
  }

  function initBtrl() {
    const json = {}
    let i = null;
      let j = null
    for (i = row; i > 0; i--) {
      const rowArr = []
      markRow.push({ k: i, is_show: 1 })
      for (j = col; j > 0; j--) {
        rowArr.push({
          seat_col: j,
          seat_row: i,
          graph_col: col - j,
          graph_row: row - i,
          fixed_x: i,
          fixed_y: j,
          seat_status: 0,
          is_show: 1,
          screen_id
        })

        markCol.push({ k: j, is_show: 1 })
      }
      json[row - i] = rowArr
    }

    return {
      seats: json,
      markRow,
      markCol: rmSame(markCol, 'k')
    }
  }
}

/**
 * 移除重复数组对象
 * @param {Array} arr 包含对象数组
 * @param {String} key 要对比的键值
 */
export const rmSame = (arr, key) => {
  const obj = {}
  return arr.reduce((v, next) => {
    obj[next[key]] ? '' : (obj[next[key]] = true && v.push(next))
    return v
  }, [])
}
