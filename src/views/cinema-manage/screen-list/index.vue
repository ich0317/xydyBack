<template>
  <div id="createseat">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-form">
            <el-form inline class="demo-form-inline">
              <el-form-item>
                <el-button type="success" size="medium" @click="addScreen">添加影厅</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="info" size="medium" @click="createSeats">创建座位图</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="map-box">
      <div class="screen-name-bar">
        <span
          v-for="(item,index) in allScreenInfo"
          :key="index"
          :class="{active: currentScreenId == item._id}"
          @click="changeScreen(item._id)"
        >{{item.screen_name}}</span>
      </div>
      <div class="screen-name-show">
        <span
          v-if="item._id == currentScreenId"
          v-for="(item,index) in allScreenInfo"
          :key="index"
        >{{ item.screen_name }}</span>
      </div>
      <div class="content-box" style="min-height:400px;">
        <table width="auto">
          <tr>
            <td width="40" height="34">&nbsp;</td>
            <td>
              <span class="mark-col" v-for="(item,index) in markCol" :key="index">{{item}}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="mark-row" v-for="(item,index) in markRow" :key="index">{{item}}</span>
            </td>
            <td>
              <div v-for="(item,index) in seatArr" :key="index" class="row-cloumn">
                <span
                  v-for="(v,idx) in item"
                  :key="idx"
                  class="col-cloumn"
                  :style="{opacity:v.is_show == 0 ? '0' : '1'}"
                  :data-_x="v.graph_col"
                  :data-_y="v.graph_row"
                  @click="drawSeat($event)"
                >{{v.seat_row}}排{{v.seat_col}}</span>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div style="position:absolute; left:20px; bottom:40px;">
      <goBack></goBack>
      <el-button type="primary" size="medium" v-show="seatArr.length != 0" @click="submitSeat">保存</el-button>
    </div>
    <!-- seat_no":"40111","seat_code":"9ada3e069bd4b74f","graph_col":"1","graph_row":"1","seat_col":"16","seat_row":"11","seat_status":0 -->
    <!-- //（0 可售、1 已售、2 锁定、3 不可售、4 已选） -->
    <inputBox :isBoxShow.sync="isScreenBox" @hideBox="dataHide" :title="boxTitle">
      <!-- 新建影厅表单 -->
      <div class="form-wrap" v-show="isSeatOrScreen == 0">
        <el-form label-position="right" label-width="100px">
          <el-form-item label="影厅名称" style="width:90%;">
            <el-input size="medium" v-model="screenInfo.screen_name"></el-input>
          </el-form-item>
          <el-form-item label="影厅类型" style="width:90%;">
            <el-select size="medium" placeholder="请选择" v-model="screenInfo.screen_type">
              <el-option label="普通" value="普通"></el-option>
              <el-option label="旗舰" value="旗舰"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="音响类型" placeholder="请选择" style="width:90%;">
            <el-select size="medium" v-model="screenInfo.sound_type">
              <el-option label="普通" value="普通"></el-option>
              <el-option label="高端" value="高端"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch size="medium" v-model="screenInfo.screen_status"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button size="medium" type="primary" @click="submitScreen">添加</el-button>
            <el-button size="medium" @click="cancelScreen">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 新建座位表单 -->
      <div class="form-wrap" v-show="isSeatOrScreen == 1">
        <el-form label-position="right" label-width="100px">
          <el-form-item label="座位布局">
            <el-row>
              <el-col :span="9">
                <el-input size="medium" v-model="seatInit.row"></el-input>
              </el-col>
              <el-col :span="3">&nbsp;&nbsp;排</el-col>
              <el-col :span="9">
                <el-input size="medium" v-model="seatInit.col"></el-input>
              </el-col>
              <el-col :span="3">&nbsp;&nbsp;列</el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="座位排序" placeholder="请选择" style="width:90%;">
            <el-select size="medium" v-model="seatInit.rowSort">
              <el-option label="从上至下" value="tb"></el-option>
              <el-option label="从下至上" value="bt"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="座位列序" placeholder="请选择" style="width:90%;">
            <el-select size="medium" v-model="seatInit.colSort">
              <el-option label="从左至右" value="lr"></el-option>
              <el-option label="从右至左" value="rl"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="medium" type="primary" @click="initMap">确定</el-button>
            <el-button size="medium" @click="cancelScreen">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </inputBox>
  </div>
</template>

<script>
import inputBox from "@/components/Inputbox/index";
import { addScreen, getScreen, addSeat, getSeat } from "@/api/screen";
import { initSeatMap } from "./createSeat.js";
import goBack from "@/components/Backone/index";
export default {
  components: {
    inputBox,
    goBack
  },
  data() {
    return {
      listLoading: true,
      isScreenBox: false,
      boxTitle: "提示",
      //添加影厅信息
      screenInfo: {
        screen_name: "",
        screen_type: "",
        sound_type: "",
        screen_status: true,
        cinema_id: ""
      },
      allScreenInfo: [], //影厅列表
      cinema_id: "", //当前影院id
      currentScreenId: "", //当前停留影厅id
      isSeatOrScreen: null, //0添加影厅 1添加座位
      //座位信息
      seatInit: {
        row: 5,
        col: 8,
        rowSort: "bt",
        colSort: "rl",
        screen_id: "" //影厅id
      },
      seatArr: [], //座位图
      markCol: [], //列坐标
      markRow: [] //行坐标
    };
  },
  mounted() {
    this.cinema_id = this.$route.query.cinema_id || "";
    this.getScreenList();
  },
  methods: {
    //显示
    addScreen() {
      this.isSeatOrScreen = 0;
      this.isScreenBox = true;
      this.screenInfo.cinema_id = this.cinema_id;
    },
    //取消
    cancelScreen() {
      this.isScreenBox = false;
    },
    //隐藏
    dataHide(data) {
      this.isScreenBox = data;
    },
    //提交新建影厅
    submitScreen() {
      addScreen(this.screenInfo).then(res => {
        let { msg, data } = res;
        this.cancelScreen();
        this.getScreenList();
        for (let name in this.screenInfo) {
          if (name == "screen_status") continue;
          this.screenInfo[name] = "";
        }
        this.$message({
          message: msg,
          type: "success"
        });
      });
    },
    //获取影厅和默认座位
    async getScreenList() {
      await getScreen({ cinema_id: this.cinema_id }).then(res => {
        let { data, code, msg } = res;
        if(code == 1){
          this.$message({
            message: msg,
            type: "error"
          });
        }else{
          this.allScreenInfo = data.screen;
          this.currentScreenId = this.seatInit.screen_id = data.screen[0]._id;
          this.formatSeat(data.seat);
        }
        
      });
    },
    //显示创建座位弹窗
    createSeats() {
      this.isSeatOrScreen = 1;
      this.isScreenBox = true;
    },
    //初始化座位图
    initMap() {
      let initRes = initSeatMap(this.seatInit);
      this.seatArr = initRes.seatJson;
      this.markCol = initRes.markCol;
      this.markRow = initRes.markRow;
      this.cancelScreen();
    },
    //画座位
    drawSeat(ev) {
      let { _x, _y } = ev.target.dataset;
      let getIsShow = this.seatArr[_y][_x - 1];
      getIsShow.is_show = getIsShow.is_show == 0 ? 1 : 0;
    },
    //提交座位
    submitSeat() {
      let arr = [];
      for (let name in this.seatArr) {
        arr = arr.concat(this.seatArr[name]);
      }
      addSeat({ seat: arr }).then(res => {
        let { msg } = res;
        this.$message({
          message: msg,
          type: "success"
        });
      });
    },
    //回显座位格式处理
    formatSeat(seatArr) {
      let len = seatArr.length;
      let i = null;
      let json = {};
      let markCol = [];
      let markRow = [];
      for (i = 0; i < len; i++) {
        if (json[seatArr[i].graph_row]) {
          json[seatArr[i].graph_row].push(seatArr[i]);
        } else {
          json[seatArr[i].graph_row] = [seatArr[i]];
          markRow.push(seatArr[i].seat_row);
        }
        markCol.push(seatArr[i].seat_col);
      }
      this.markCol = [...new Set(markCol)];
      this.markRow = markRow;
      this.seatArr = json;
    },
    //切换影厅
    changeScreen(screen_id) {
      this.currentScreenId = screen_id;
      getSeat({ screen_id }).then(res => {
        let { data, code, msg } = res;
        if (code == 1) {
          this.$message.error(msg);
        }
        this.formatSeat(data);
      });
    }
  }
};
</script>
<style lang="scss">
#createseat {
  background: #f8f8f8;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .el-form-item__label {
    padding: 0;
    line-height: 2;
  }
  .screen-name-bar {
    padding: 0 20px;
    background: #f8f8f8;
    border-bottom: 1px solid #ddd;
    span {
      display: inline-block;
      padding: 0 15px;
      height: 36px;
      line-height: 36px;
      background: #f6f6f6;
      border-radius: 4px 4px 0 0;
      border: 1px solid #ddd;
      border-bottom-color: #fff;
      position: relative;
      top: 1px;
      cursor: pointer;
      margin-right: 10px;
    }
    .active {
      background: #fff;
    }
  }

  .form-wrap {
    padding: 10px 0 0 0;
    .el-form-item__label {
      padding: 6px 10px 0 0;
    }
  }
  .screen-name-show {
    text-align: center;
    span {
      display: inline-block;
      background: #f5f5f5;
      padding: 5px 20px;
      min-width: 300px;
      border-radius: 0 0 50% 50%;
      font-size: 12px;
    }
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  .row-cloumn {
    overflow: hidden;
  }
  .col-cloumn {
    width: 40px;
    height: 34px;
    float: left;
    margin: 3px 3px;
    background: url(../../../assets/seat-s.png) no-repeat;
    background-size: 100%;
  }
  .mark-col {
    width: 40px;
    height: 34px;
    float: left;
    margin: 0 3px;
    text-align: center;
  }
  .mark-row {
    width: 40px;
    height: 34px;
    line-height: 34px;
    margin: 5px 0;
    display: block;
  }
  .content-box {
    display: flex;

    justify-content: center;
  }
  .submit-btns {
    padding: 20px;
  }
  .map-box{
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 100px;
    background: #fff;
    border-bottom: 1px solid #ddd;
  }
}
</style>
