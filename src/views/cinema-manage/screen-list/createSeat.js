export const initSeatMap = seatInit => {
  let { row, col, rowSort, colSort , screen_id} = seatInit;
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
        markRow.push({n:i,isShow:true});
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
            is_show: 1,
            screen_id
          }); 
        }

        seatJson[i] = arr;
      }
      for (let k=1; k<=colNum; k++){
        markCol.push({n:k,isShow:true});
      }
      break;
    case "tbrl":
      for (i = 1; i <= rowNum; i++) {
        //排
        markRow.push(i);
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
            is_show: 1,
            screen_id
          });
        }
        
        seatJson[i] = arr;
      }
      for (let k = colNum; k >= 1; k--){
        markCol.push(k);
      }
      break;
    case "btlr":
    
      for (i = rowNum; i >= 1; i--) {
        //排
        markRow.push(i);
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
            is_show: 1,
            screen_id
          });
        }
        
        seatJson[r] = arr;
      }
      for (let k=1; k<=colNum; k++){
        markCol.push(k);
      }
      break;
    case "btrl":

      for (i = rowNum; i >= 1; i--) {
        //排
        markRow.push(i);
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
            is_show: 1,
            screen_id
          });
        }
        
        seatJson[r] = arr;
      }
      for (let k = colNum; k >= 1; k--){
        markCol.push(k);
      }
      break;
  }
  return {
    seatJson,
    markCol,
    markRow
  };
};
