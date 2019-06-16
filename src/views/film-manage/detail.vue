<template>
  <div id="film">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">基础信息</div>
        </div>
      </el-col>
    </el-row>
    <div class="content-box">
      <el-form ref="form" label-width="110px" style="width:560px;">
        <el-form-item label="影片名称">
          <el-input v-model="filmInfo.film_name"></el-input>
        </el-form-item>
        <el-form-item label="影片别名">
          <el-input v-model="filmInfo.alias"></el-input>
        </el-form-item>
        
        <el-form-item label="影片语言">
          <el-select v-model="filmInfo.language" placeholder="请选择" style="width:366px;">
            <el-option label="国语" value="国语"></el-option>
            <el-option label="英语" value="英语"></el-option>
            <el-option label="粤语" value="粤语"></el-option>
          </el-select>
          <el-button type="primary" style="margin-left:10px;">添加</el-button>
        </el-form-item>
        <el-form-item label="影片版本">
          <el-select v-model="filmInfo.film_version" placeholder="请选择" style="width:366px;">
            <el-option label="2D" value="2D"></el-option>
            <el-option label="3D" value="3D"></el-option>
            <el-option label="IMAX" value="IMAX"></el-option>
            <el-option label="中国巨幕" value="中国巨幕"></el-option>
          </el-select>
          <el-button type="primary" style="margin-left:10px;">添加</el-button>
        </el-form-item>
        <el-form-item label="影片类型">
          <el-input v-model="filmInfo.film_type" style="width:366px;"></el-input><el-button type="primary" style="margin-left:10px;">添加</el-button>
        </el-form-item>
        <el-form-item label="演员">
          <el-input v-model="filmInfo.actors" ></el-input>
        </el-form-item>
        <el-form-item label="导演">
          <el-input v-model="filmInfo.director"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="片长">
              <el-input v-model="filmInfo.film_long"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上映日期">
              <el-date-picker
                v-model="filmInfo.release_date"
                type="date"
                placeholder="上映日期" style="width:170px;">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="制作国家/地区">
          <el-input v-model="filmInfo.country"></el-input>
        </el-form-item>
        <el-form-item label="剧情介绍">
          <el-input type="textarea" v-model="filmInfo.brief"></el-input>
        </el-form-item>
        <el-form-item label="影片海报">
          <el-input v-model="filmInfo.film_photo"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" >保存</el-button>
          <el-button>返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCollegeList, delCollege } from "@/api/cinema";
export default {
  filters: {},
  data() {
    return {
      list: null,
      listLoading: true,
      searchName:null, //搜索关键字
      filmInfo:{
        film_name:"",   //影片名称
        alias:"",   //别名
        film_photo:"",  //影片海报
        film_long:"",   //影片时长
        film_type:"",   //影片类型
        actors:"",  //演员
        director:"",    //导演
        brief:"",   //简介
        country:"", //制作国家
        language:"",    //语言
        release_date:"", //上映日期
        film_version:"" //影片版本
      }
    };
  },
  created() {
    
  },
  methods: {
    
  }
};
</script>
<style lang="scss">
</style>
