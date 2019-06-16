<template>
  <div id="plan">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">查询条件</div>
          <div class="pan-form">
            <el-form :inline="true" label-width="80px" class="demo-form-inline">
              <el-form-item>
                <el-button >返回</el-button>
                <el-button type="primary" >审核通过</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="content-box">
      <div class="time-box">
        <div class="select-date">
          <el-date-picker
            type="date"
            placeholder="选择日期" style="width:100%">
          </el-date-picker>
        </div>
        <div class="time-line">
          <ul>
            <li>6:00</li>
            <li>7:00</li>
            <li>8:00</li>
            <li>9:00</li>
            <li>10:00</li>
            <li>11:00</li>
            <li>12:00</li>
            <li>13:00</li>
            <li>14:00</li>
            <li>15:00</li>
            <li>16:00</li>
            <li>17:00</li>
            <li>18:00</li>
            <li>19:00</li>
            <li>20:00</li>
            <li>21:00</li>
            <li>22:00</li>
            <li>23:00</li>
            <li>24:00</li>
          </ul>
        </div>
      </div>

      <div class="screen-box">
        <div class="screen-bar clearfix">
          <div class="screen-name">东方时尚</div>
          <div class="add">+</div>
          <ul class="time-item clearfix">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCinemaList, delCinema } from "@/api/cinema";
export default {
  filters: {},
  data() {
    return {
      list: null,
      listLoading: true,
      college_id:"", //上一级页面带过来
      searchName:null
    };
  },
  mounted() {
   
  },
  methods: {

  },
  computed:{
 
  }
};
</script>
<style lang="scss">
#plan{
  .time-box{ background: url("../../../assets/time_bg.png") repeat-x; height: 58px; border: 1px solid #ddd;}
  .select-date{ float: left; width: 160px; padding: 9px 0 0 10px;}
  .time-line{
     background: url("../../../assets/time_line.png") repeat-x left 33px;
     height: 58px;
     margin-left: 170px;
     overflow: hidden;
  }
  .time-line ul{ float: left; margin: 0; padding: 0;}
  .time-line li{ list-style: none; font-size: 12px; color: #999; width: 60px; float: left; padding: 33px 0 0 2px;}
  .screen-name{ float: left; width: 141px; height: 80px; border-right: 1px solid #ddd;}
  .screen-box{ border: 1px solid #ddd;}
  .add{ width: 30px; height: 80px; float: left; border-right: 1px solid #ddd;}
  .time-item li{ width: 30px; height: 80px; float: left; border-right: 1px solid #ddd;}
}
</style>
