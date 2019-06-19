export const initSeatMap = seatInit => {
  let { row, col, rowSort, colSort } = seatInit;
  let seatJson = {};
  let i = null,
    j = null;
    let r=0;
  let rowNum = row;
  let colNum = col;
  let markCol = [];
  let markRow = [];

  switch (rowSort + colSort) {
    case "tblr":
      for (i = 1; i <= rowNum; i++) {
        r++;
        let arr = [];
        let c=0;
        for (j = 1; j <= colNum; j++) {
            c++;
          arr.push({
            seat_col: j,
            seat_row: i,
            graph_col: j,
            graph_row: i,
            seat_status: 0,
            isShow: 1
          });
          markCol.push(c);
        }
        seatJson[i] = arr;
      }
      break;
    case "tbrl":
      for (i = 1; i <= rowNum; i++) {
        //排
        r++;
        let arr = [];
        let c=0;
        for (j = colNum; j >= 1; j--) {
          //列
          c++;
          arr.push({
            seat_col: j,
            seat_row: i,
            graph_col: c,
            graph_row: r,
            seat_status: 0,
            isShow: 1
          });
        }
        seatJson[i] = arr;
      }
      break;
    case "btlr":
    
      for (i = rowNum; i >= 1; i--) {
        //排
        r++;
        let arr = [];
        let c=0;
        for (j = 1; j <= colNum; j++) {
          //列
          c++;
          arr.push({
            seat_col: j,
            seat_row: i,
            graph_col: c,
            graph_row: r,
            seat_status: 0,
            isShow: 1
          });
        }
        
        seatJson[r] = arr;
      }
      break;
    case "btrl":

      for (i = rowNum; i >= 1; i--) {
        //排
        r++;
        let arr = [];
        let c=0;
        for (j = colNum; j >= 1; j--) {
          //列
          c++;
          arr.push({
            seat_col: j,
            seat_row: i,
            graph_col: c,
            graph_row: r,
            seat_status: 0,
            isShow: 1
          });
        }
        seatJson[r] = arr;
      }
      break;
  }
  return {
    seatJson,
    markCol,
    markRow
  };
};
