<template>
  <div id="plan" @mousemove="drapMove($event)">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">查询条件</div>
          <div class="pan-form">
            <el-form :inline="true" label-width="80px" class="demo-form-inline">
              <!-- <el-autocomplete
                v-model="state"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>-->
              <!-- <el-form-item label="选择语言">
                <el-select>
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择版本">
                <el-select>
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="影片价格">
                <el-input ></el-input>
              </el-form-item>-->
              <el-form-item>
                <el-button type="primary">添加影片</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="content-box">
      <div class="time-box">
        <div class="select-date">
          <el-date-picker type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
        </div>
        <div class="time-line">
          <ul>
            <li v-for="(item,index) in effectiveTimeLong" :key="index">{{item}}:00</li>
          </ul>
        </div>
      </div>

      <div class="screen-box" ref="screenbox">
        <div class="screen-bar clearfix" nums="0">
          <div class="screen-name">东方时尚</div>
          <div class="lines" ref="lines">
            <ul class="time-item clearfix">
              <li v-for="(item,index) in effectiveTimeLong.length * 2" :key="index"></li>
            </ul>
          </div>
        </div>

        <div class="screen-bar clearfix" nums="1">
          <div class="screen-name">哈哈哈哈</div>
          <div class="lines">
            <ul class="time-item clearfix">
              <li v-for="(item,index) in effectiveTimeLong.length * 2" :key="index"></li>
            </ul>
          </div>
        </div>

        <div
          class="drag-film"
          ref="drag"
          :style="{left:filmPos.pointXCenter+'px',top:filmPos.pointYCenter+'px',width:dragFilm.film_long+'px'}"
        >
          <dl class="drag-film-content">
            <dt>{{dragFilm.film_name}}</dt>
            <dd>{{dragFilm.start_time}}-{{dragFilm.end_time}}</dd>
            <dd>{{dragFilm.film_version}} {{dragFilm.language}}</dd>
            <dd>{{dragFilm.sell_price}}元</dd>
          </dl>
        </div>
        <div class="mark-line" :style="{left:filmPos.pointXCenter+'px',top:0,height:filmPos.pointYCenter*81+'px'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
import { to0 } from '@/utils/index';
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      effectiveTimeLong: [],
      filmPos: {},
      //初始化配置
      initConfig:{
        startPoint:6, //时间轴起始时间
        endPoint:23,   //时间轴结束时间
        screenNameW:170 //*时间轴左侧宽度 需手动随样式修改
      },
      //所选影片信息
      dragFilm:{
        film_name:'西游记女儿国西游记女儿国',
        start_time:'10:00',
        end_time:'12:00',
        start_date:'2018-10-12',
        language:'国语',
        film_version:'3D',
        sell_price:'10.0',
        film_long:120,
        _id:'1'
      },
      defaultStopTime:0  //影片悬浮时的时间点 默认6点时间戳
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
      let { pageX, pageY } = ev;
      let screenbox = this.$refs.screenbox; //整体影厅框
      let oDrag = this.$refs.drag; //影片浮层
      let oLine = this.$refs.lines; //单个时间条
      let boxHeight = screenbox.offsetHeight; //整体影厅高度
      let lineWidth = this.effectiveTimeLong.length * 162; //整体影厅宽度
      let { top,left } = this.getPos(screenbox); //整体影厅位置
      let $left  = this.getPos(oLine).left; //单个时间条位置
      if (
        pageX < $left ||
        pageX > $left + lineWidth ||
        pageY <= top ||
        pageY >= top + boxHeight
      ) {
        this.filmPos = { pointXCenter:-9999, pointYCenter:0 };
      } else {
        let pointX = pageX - $left
        let pointY = pageY - top;
        let pointXCenter = null;
        //每移动走5分钟
        if(pointX % 5 == 0){
          //170影厅名称模块的宽度
          pointXCenter = (pointX) - oDrag.offsetWidth / 2;
          let nowStopTime = 0;
          if(pointXCenter <= 0){
            pointXCenter = 0
          }
          if(pointXCenter >= this.effectiveTimeLong.length * 60 - this.dragFilm.film_long){
            pointXCenter = this.effectiveTimeLong.length * 60 - this.dragFilm.film_long
          }
          console.log(pointXCenter);
          nowStopTime = this.defaultStopTime + pointXCenter * 60;

          let startH = parseInt(nowStopTime / 3600);
          let startM = to0((nowStopTime % 3600) / 60);
          this.dragFilm.start_time = `${startH}:${startM}`;
          
          let endH = parseInt((nowStopTime + this.dragFilm.film_long * 60) / 3600);
          let endM = to0(((nowStopTime + this.dragFilm.film_long * 60) % 3600) / 60);
          this.dragFilm.end_time = `${endH}:${endM}`;

          this.filmPos.pointXCenter = pointXCenter + 170;

        }
        let pointYCenter = parseInt(pointY / 81) * 81;
        this.filmPos.pointYCenter = pointYCenter;
      }
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
    },

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
  .mark-line{
    height: 0;
    border-left: 1px dotted #ff9797;
    width: 1px;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
