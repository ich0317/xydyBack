<template>
  <div id="plan" @mousemove="drapMove($event)">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">查询条件</div>
          <div class="pan-form">
            <el-form :inline="true" label-width="80px" class="demo-form-inline">
              <el-autocomplete
                v-model="searchInfo.film_name"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
                style="width:220px;"
                :disabled="isAdd"
              ></el-autocomplete>
              <el-form-item label="选择语言">
                <el-select v-model="searchInfo.language" :disabled="isAdd">
                  <el-option
                    :label="item"
                    :value="item"
                    v-for="(item,index) in searchInfo.languageArr"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择版本">
                <el-select v-model="searchInfo.film_version" :disabled="isAdd">
                  <el-option
                    :label="item"
                    :value="item"
                    v-for="(item,index) in searchInfo.film_versionArr"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="影片价格">
                <el-input style="width:100px;" v-model="searchInfo.sell_price" :disabled="isAdd"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addFilm">{{isAdd ? '取消添加' : '添加影片'}}</el-button>
              </el-form-item>
              <el-form-item>
                <el-button @click="agree">审核影片</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="content-box" element-loading-text="Loading" v-loading="listLoading">
      <div class="time-box">
        <div class="select-date">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            style="width:100%"
            v-model="nowDate"
            @change="getSelectData"
          ></el-date-picker>
        </div>
        <div class="time-line">
          <ul>
            <li v-for="(item,index) in effectiveTimeLong" :key="index">{{item}}:00</li>
          </ul>
        </div>
      </div>
      <div class="screen-box" ref="screenbox">
        <div class="screen-bar clearfix" v-for="(v,idx) in screenList" :key="idx">
          <div class="screen-name">{{v.screen_name}}</div>
          <div class="lines" ref="lines" :data-screenid="v._id">
            <ul class="time-item clearfix">
              <li v-for="(item,index) in effectiveTimeLong.length * 2" :key="index"></li>
            </ul>
            <div class="time-progress"></div>
            <div
              class="drag-film"
              v-for="(item,index) in v.children"
              :key="'a'+index"
              :style="{left:item._start_time+'px',width:item.film_long+'px'}"
              :class="'flimStatus'+ item.status"
              :id="item._id"
              @contextmenu.stop="setRightClick($event,idx,index)"
              @click.stop="tapSelect(item.screen_id,item._id,item.status)"
            >
              <dl class="drag-film-content">
                <dt>{{item.film_name}}</dt>
                <dd>{{item.start_datetime | getHm}}-{{item.end_datetime | getHm}}</dd>
                <dd>{{item.film_version}} {{item.language}}</dd>
                <dd>{{item.sell_price}}元</dd>
              </dl>
              <div class="setbox" v-show="item._isSetShow">
                <p @click.stop="delPlan(item.screen_id,item._id)">删除</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 拖拽框-->
        <div
          class="drag-film flimStatus0"
          ref="drag"
          :style="{left:filmPos.pointXCenter+'px',top:filmPos.pointYCenter+'px',width:dragFilm.film_long+'px'}"
          @click="downFilm"
        >
          <dl class="drag-film-content">
            <dt>{{dragFilm.film_name}}</dt>
            <dd>{{dragFilm.start_time}}-{{dragFilm.end_time}}</dd>
            <dd>{{dragFilm.film_version}} {{dragFilm.language}}</dd>
            <dd>{{dragFilm.sell_price}}元</dd>
          </dl>
        </div>
        <div
          class="mark-line"
          :style="{left:filmPos.pointXCenter+'px',top:0,height:filmPos.pointYCenter*81+'px'}"
        ></div>
      </div>
    </div>
   
  </div>
</template>

<script>
import {
  searchFilm,
  addSession,
  getSession,
  delSession,
  agreeSession
} from "@/api/plan";
import { getScreen } from "@/api/screen";
import { to0, stampToTime, timeToStamp, rmSameObj } from "@/utils/index";
export default {
  data() {
    return {
      listLoading: true,
      effectiveTimeLong: [],
      filmPos: {},
      nowDate: new Date(), //当前日期
      //初始化配置
      initConfig: {
        startPoint: 6, //时间轴起始时间
        endPoint: 23, //时间轴结束时间
        screenNameW: 170, //*时间轴左侧宽度 需手动随样式修改
        startPointStamp: "" //时间轴起始时间时间戳
      },
      //所选影片信息
      dragFilm: {},
      defaultStopTime: 0, //影片悬浮时的时间点 默认6点时间戳
      //搜索条件
      searchInfo: {
        film_name: "",
        language: "",
        languageArr: [],
        film_version: "",
        film_versionArr: [],
        sell_price: ""
      },
      isAdd: false, //是否添加影片
      saveFilm: [], //存贮已落下的排期和获取的排期
      screenList: [], //影厅和排期
      cinema_id: null,
      agreeFilm: [] //待审核影片
    };
  },
  mounted() {
    this.cinema_id = this.$route.query.cinema_id;
   
    this.initConfig.startPointStamp =
      timeToStamp(
        `${stampToTime(this.nowDate, "YMD")} ${this.initConfig.startPoint}:0:0`
      ) / 1000;
    // let getNow = stampToTime();
    // console.log(getNow);
    this.initTable(this.initConfig);
    this.getScreenList();
  },
  computed: {},
  methods: {
    //初始化时间轴
    initTable(params) {
      let { startPoint, endPoint } = params;
      for (let i = startPoint; i <= endPoint; i++) {
        this.effectiveTimeLong.push(i);
      }
      this.defaultStopTime = this.initConfig.startPoint * 3600;
    },
    //获取影厅
    async getScreenList() {
      this.listLoading = true;
      let screenList = await getScreen({ cinema_id: this.cinema_id }).then(
        res => {
          let { data } = res;
          return data.screen;
        }
      );
  
      getSession({ cinema_id: this.cinema_id,start_datetime:`${stampToTime(this.nowDate,'YMD')}`}).then(res => {
        let { data } = res;
        for (let i = 0; i < screenList.length; i++) {
          screenList[i].children = [];
          for (let j = 0; j < data.length; j++) {
            if (screenList[i]._id == data[j].screen_id) {
              data[j]._start_time =
                parseInt((timeToStamp(data[j].start_datetime) / 1000 -
                  this.initConfig.startPointStamp) /
                60);

              data[j]._isSetShow = false;
              screenList[i].children.push(data[j]);
            }
          }
        }
        
        this.saveFilm = data;
        this.screenList = screenList;
        this.listLoading = false;
      });
    },

    drapMove(ev) {
      if (!this.isAdd) return;
      let { pageX, pageY } = ev;
      let screenbox = this.$refs.screenbox; //整体影厅框
      let oDrag = this.$refs.drag; //影片浮层
      let oLine = this.$refs.lines[0]; //单个时间条
      let boxHeight = screenbox.offsetHeight; //整体影厅高度
      let lineWidth = this.effectiveTimeLong.length * 162; //整体影厅宽度
      let { top, left } = this.getPos(screenbox); //整体影厅位置
      let $left = this.getPos(oLine).left; //单个时间条位置

      if (
        pageX < $left ||
        pageX > $left + lineWidth ||
        pageY <= top ||
        pageY >= top + boxHeight
      ) {
        //时间条外部 隐藏
        this.filmPos = { pointXCenter: -9999, pointYCenter: 0 };
      } else {
        let pointX = pageX - $left;
        let pointY = pageY - top;
        let pointXCenter = null; //left坐标 == 分钟
        //每移动走5分钟

        if (pointX % 5 == 0) {
          //170影厅名称模块的宽度
          pointXCenter = pointX - oDrag.offsetWidth / 2;
          let nowStopTime = 0;
          if (pointXCenter <= 0) {
            pointXCenter = 0;
          }
          if (
            pointXCenter >=
            this.effectiveTimeLong.length * 60 - this.dragFilm.film_long
          ) {
            pointXCenter =
              this.effectiveTimeLong.length * 60 - this.dragFilm.film_long;
          }
          this.filmPos.pointXCenter = pointXCenter + 170;

          let getCurrentStamp =
            this.initConfig.startPointStamp + pointXCenter * 60;

          this.dragFilm.start_time = stampToTime(getCurrentStamp, "hm");
          this.dragFilm.end_time = stampToTime(
            this.dragFilm.film_long * 60 + getCurrentStamp,
            "hm"
          );
          this.dragFilm._start_time = parseInt(pointXCenter); //落下left time
        }
        let n = parseInt(pointY / 81);
        let pointYCenter = n * 81;
        if (this.screenList[n]) {
          this.dragFilm.screen_id = this.screenList[n]._id;
          this.dragFilm.screen_name = this.screenList[n].screen_name;
        }
        this.filmPos.pointYCenter = pointYCenter;
        this.dragFilm._t = pointYCenter; //落下top
      }
    },
    //影片搜索结果处理
    handleSelect(val) {
      this.searchInfo.language = "";
      this.searchInfo.film_version = "";
      this.searchInfo.languageArr = val.language.split("/");
      this.searchInfo.film_versionArr = val.film_version.split("/");
      this.dragFilm = val;
      this.dragFilm.film_id = val._id;
      delete this.dragFilm._id;
      delete this.dragFilm.__v;
    },
    querySearchAsync(queryString, cb) {
      if (queryString == "") return;
      searchFilm({ film_name: queryString }).then(res => {
        let { data } = res;
        data.forEach(v => {
          v.value = v.film_name;
        });
        cb(data);
      });
    },
    //添加影片
    addFilm() {
      this.dragFilm.language = this.searchInfo.language;
      this.dragFilm.film_version = this.searchInfo.film_version;
      this.dragFilm.sell_price = this.searchInfo.sell_price;

      if (this.isAdd) {
        this.$message({
          message: "影片已取消",
          type: "success"
        });
        this.isAdd = false;
      } else {
        this.$message({
          message: "影片已添加，请将鼠标拖动至时间轴",
          type: "success"
        });
        this.isAdd = true;
      }
    },
    //落下影片
    downFilm() {
      if (this.filmRepeat(this.saveFilm, { ...this.dragFilm }) == 0) {
        let oDragFilm = { ...this.dragFilm };
        oDragFilm.cinema_id = this.cinema_id;
        oDragFilm.status = 0;
        oDragFilm.start_datetime = `${stampToTime(this.nowDate, "YMD")} ${
          oDragFilm.start_time
        }`;
        oDragFilm.end_datetime = `${stampToTime(this.nowDate, "YMD")} ${
          oDragFilm.end_time
        }`;

        addSession(oDragFilm).then(res => {
          this.saveFilm._isSetShow = false;
          this.saveFilm.push(oDragFilm);
          this.screenList.forEach(v => {
            if (v._id == oDragFilm.screen_id) {
              v.children.push(oDragFilm);
            }
          });
        });
      }
    },
    //验证重复落下
    filmRepeat(saveArr, newArr) {
      let count = 0;
      saveArr.forEach(v => {
        let oldStartTime = v._start_time * 1;
        let oldendTime = oldStartTime + v.film_long;
        let newStartTime = newArr._start_time * 1;
        let newEndTime = newStartTime + v.film_long;
        if (
          v.screen_id == newArr.screen_id &&
          ((newStartTime >= oldStartTime && newStartTime <= oldendTime) ||
            (newEndTime >= oldStartTime && newEndTime <= oldendTime))
        ) {
          //不通过
          count++;
        }
      });
      return count;
    },
    //右键
    setRightClick(ev, idx, index) {
      ev.preventDefault();
      let clickData = this.screenList[idx].children[index];
      clickData._isSetShow = !clickData._isSetShow;
    },
    //删除影片
    delPlan(screen_id, _id) {
      this.$confirm(`群定要删除该排期吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delSession({ _id }).then(res => {
          this.$message({
            message: res.msg,
            type: "success"
          });

          this.saveFilm.forEach((v, i) => {
            if (v._id == _id) {
              this.saveFilm.splice(i, 1);
            }
          });
          this.screenList.forEach(v => {
            if (v._id == screen_id) {
              v.children.forEach((item, i) => {
                if (item._id == _id) {
                  v.children.splice(i, 1);
                }
              });
            }
          });
        });
      });
    },
    //审核
    agree() {
      if(this.agreeFilm.length == 0){
        this.$message({
          message: "请先选择影片",
          type: "error"
        });
        return;
      };
      let arr = this.agreeFilm.map(v => v._id);
      agreeSession(arr).then(res => {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getScreenList();
      });
    },
    //点选排期
    tapSelect(screen_id, _id,status) {
      if(status != 0)return;
      let delObj = rmSameObj(this.agreeFilm, "_id", { screen_id, _id });
      let aD = document.querySelectorAll(".drag-film");
      if (!delObj) {
        this.agreeFilm.push({ screen_id, _id });
        for (let i = 0; i < aD.length; i++) {
          if (aD[i].getAttribute("id") == _id) {
            aD[i].className = aD[i].className + " bd";
          }
        }
      } else {
        for (let i = 0; i < aD.length; i++) {
          if (aD[i].getAttribute("id") == delObj[0]._id) {
            aD[i].className = aD[i].className.replace(/\sbd/g, "");
          }
        }
      }
    },
    //切换日期
    getSelectData(val) {
      this.initConfig.startPointStamp =
      timeToStamp(
        `${stampToTime(this.nowDate, "YMD")} ${this.initConfig.startPoint}:0:0`
      ) / 1000;
      this.getScreenList();
    },
    getPos(obj) {
      var top = 0;
      var left = 0;
      while (obj) {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
      }
      return { left, top };
    }
  },
  filters: {
    //时间戳转时间
    getHm: function(val) {
      return stampToTime(val, "hm");
    }
  }
};
</script>
<style lang="scss">
#plan {
  .time-box {
    background: url("../../../assets/time_bg.png") repeat-x;
    height: 58px;
    border: 1px solid #ddd;
  }
  .select-date {
    float: left;
    width: 160px;
    padding: 9px 0 0 10px;
  }
  .time-line {
    background: url("../../../assets/time_line.png") repeat-x left 33px;
    height: 58px;
    margin-left: 170px;
    overflow: hidden;
  }
  .time-line ul {
    float: left;
    margin: 0;
    padding: 0;
  }
  .time-line li {
    list-style: none;
    font-size: 12px;
    color: #999;
    width: 60px;
    float: left;
    padding: 33px 0 0 2px;
  }
  .screen-name {
    float: left;
    width: 171px;
    height: 80px;
    border-right: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .screen-box {
    border: 1px solid #ddd;
    border-bottom: none;
    position: relative;
    overflow: hidden;
  }
  .time-item li {
    width: 30px;
    height: 80px;
    float: left;
    border-right: 1px solid #ddd;
  }
  .drag-film {
    height: 80px;
    width: 150px;
    position: absolute;
    left: -9999px;
    top: 0;
  }
  .flimStatus0 {
    background: rgba(255, 210, 210, 0.8);
    border: 1px solid #ff9797;
  }
  .flimStatus1 {
    background: rgba(200, 242, 198, 0.8);
    border: 1px solid #a3dfa1;
  }
  .flimStatus2,
  .flimStatus3 {
    background: rgba(239, 239, 239, 0.8);
    border: 1px solid #bbbbbb;
  }
  .drag-film-content {
    padding: 4px 5px 2px;
    font-size: 12px;
    color: #333;
    dt,
    dd {
      height: 18px;
      line-height: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .lines {
    margin-left: 171px;
    position: relative;
  }
  .screen-bar {
    border-bottom: 1px solid #ddd;
  }
  .mark-line {
    height: 0;
    border-left: 1px dotted #ff9797;
    width: 1px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .setbox {
    background: #fff;
    width: 40px;
    position: absolute;
    right: -42px;
    top: -1px;
    font-size: 12px;
    text-align: center;
    padding: 5px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    z-index: 99;
    p {
      padding: 4px 0;
      cursor: pointer;
      &:hover {
        color: #666;
      }
    }
  }
  .bd {
    border-width: 2px;
  }
  .time-progress{
    position: absolute; left: 0; top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.06);
    width: 0;
  }
}
</style>
