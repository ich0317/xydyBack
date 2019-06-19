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
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="content-box">
      <div class="time-box">
        <div class="select-date">
          <el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="nowDate" @change="getSelectData"></el-date-picker>
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
          </div>
        </div>

        <!-- 落下框 -->
        <div
          class="drag-film"
          v-for="(item,index) in saveFilm"
          :key="'a'+index"
          :style="{left:item._start_time+'px',top:item._t+'px',width:item.film_long+'px'}"
        >
          <dl class="drag-film-content">
            <dt>{{item.film_name}}</dt>
            <dd>{{item.start_time}}-{{item.end_time}}</dd>
            <dd>{{item.film_version}} {{item.language}}</dd>
            <dd>{{item.sell_price}}元</dd>
          </dl>
        </div>

        <!-- 拖拽框 -->
        <div
          class="drag-film"
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
import { searchFilm } from "@/api/plan";
import { to0 } from "@/utils/index";
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      effectiveTimeLong: [],
      filmPos: {},
      nowDate:new Date(), //当前日期
      //初始化配置
      initConfig: {
        startPoint: 6, //时间轴起始时间
        endPoint: 23, //时间轴结束时间
        screenNameW: 170 //*时间轴左侧宽度 需手动随样式修改
      },
      //所选影片信息
      dragFilm: {
        film_name: "",
        start_time: "",
        end_time: "",
        start_date: "",
        language: "",
        film_version: "",
        sell_price: "",
        film_long: ""
      },
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
      //是否添加影片
      isAdd: false,
      //存贮已落下的电影
      saveFilm: [],
      screenList: [
        {
          screen_name: "1号大礼堂",
          _id: "111"
        },
        {
          screen_name: "阶梯教室",
          _id: "222"
        }
      ]
    };
  },
  mounted() {
    this.initTable(this.initConfig);
  },
  methods: {
    //初始化时间轴
    initTable(params) {
      let { startPoint, endPoint } = params;
      for (let i = startPoint; i <= endPoint; i++) {
        this.effectiveTimeLong.push(i);
      }
      this.defaultStopTime = this.initConfig.startPoint * 3600;
    },
    drapMove(ev) {
      if (!this.isAdd) return;
      let { pageX, pageY } = ev;
      let screenbox = this.$refs.screenbox; //整体影厅框
      let oDrag = this.$refs.drag; //影片浮层
      let oLine = this.$refs.lines[0]; //单个时间条
      let boxHeight = screenbox.offsetHeight || ''; //整体影厅高度
      let lineWidth = this.effectiveTimeLong.length * 162; //整体影厅宽度
      let { top, left } = this.getPos(screenbox); //整体影厅位置
      let $left = this.getPos(oLine).left; //单个时间条位置

      if (
        pageX < $left ||
        pageX > $left + lineWidth ||
        pageY <= top ||
        pageY >= top + boxHeight
      ) {
        this.filmPos = { pointXCenter: -9999, pointYCenter: 0 };
      } else {
        let pointX = pageX - $left;
        let pointY = pageY - top;
        let pointXCenter = null;
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

          nowStopTime = this.defaultStopTime + pointXCenter * 60;
          this.dragFilm._start_time = pointXCenter + 170; //落下left time

          let startH = parseInt(nowStopTime / 3600);
          let startM = to0((nowStopTime % 3600) / 60);
          this.dragFilm.start_time = `${startH}:${startM}`;

          let endH = parseInt(
            (nowStopTime + this.dragFilm.film_long * 60) / 3600
          );
          let endM = to0(
            ((nowStopTime + this.dragFilm.film_long * 60) % 3600) / 60
          );
          this.dragFilm.end_time = `${endH}:${endM}`;

          this.filmPos.pointXCenter = pointXCenter + 170;
        }
        let n = parseInt(pointY / 81);
        let pointYCenter = n * 81;
        if (this.screenList[n]) {
          this.dragFilm.screen_id = this.screenList[n]._id;
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

      this.dragFilm.film_name = val.film_name;
      this.dragFilm.film_long = val.film_long;
      this.dragFilm._id = val._id;
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
        this.saveFilm.push({ ...this.dragFilm });
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
          (v.screen_id == newArr.screen_id) && (
            (newStartTime >= oldStartTime && newStartTime <= oldendTime) ||
          (newEndTime >= oldStartTime && newEndTime <= oldendTime))
        ) {
          //不通过
          count++;
        }
      });
      return count;
    },
    getSelectData(val){
      let oDate = new Date(val);
      console.log(oDate.setFullYear(),oDate.getMinutes());
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
  computed: {}
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
    border: 1px solid #ff9797;
    background: rgba(255, 210, 210, 0.8);
    height: 80px;
    width: 150px;
    position: absolute;
    left: -9999px;
    top: 0;
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
}
</style>
