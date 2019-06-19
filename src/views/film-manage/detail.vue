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
          <el-select v-model="filmInfo._language" placeholder="请选择" style="width:366px;">
            <el-option label="国语" value="国语"></el-option>
            <el-option label="英语" value="英语"></el-option>
            <el-option label="粤语" value="粤语"></el-option>
            <el-option label="法语" value="法语"></el-option>
            <el-option label="德语" value="德语"></el-option>
            <el-option label="俄语" value="俄语"></el-option>
            <el-option label="意大利语" value="意大利语"></el-option>
            <el-option label="日语" value="日语"></el-option>
            <el-option label="韩语" value="韩语"></el-option>
            <el-option label="印度语" value="印度语"></el-option>
          </el-select>
          <el-button type="primary" style="margin-left:10px;" @click="addFn('language')">添加</el-button>
          <div class="selected">
            <span
              class="selected-box"
              v-for="(item,index) in filmInfo.language"
              :key="index"
              @click="rmFn('language',index)"
            >
              {{item}}
              <b>x</b>
            </span>
          </div>
        </el-form-item>
        <el-form-item label="影片版本">
          <el-select v-model="filmInfo._film_version" placeholder="请选择" style="width:366px;">
            <el-option label="2D" value="2D"></el-option>
            <el-option label="3D" value="3D"></el-option>
            <el-option label="IMAX" value="IMAX"></el-option>
            <el-option label="中国巨幕" value="中国巨幕"></el-option>
          </el-select>
          <el-button type="primary" style="margin-left:10px;" @click="addFn('film_version')">添加</el-button>
          <div class="selected">
            <span
              class="selected-box"
              v-for="(item,index) in filmInfo.film_version"
              :key="index"
              @click="rmFn('film_version',index)"
            >
              {{item}}
              <b>x</b>
            </span>
          </div>
        </el-form-item>
        <el-form-item label="影片类型">
          <el-input v-model="filmInfo.film_type" style="width:366px;"></el-input>
        </el-form-item>
        <el-form-item label="导演">
          <el-input v-model="filmInfo.director"></el-input>
        </el-form-item>
        <el-form-item label="演员">
          <el-input v-model="filmInfo.actors"></el-input>
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
                placeholder="上映日期"
                style="width:170px;"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="制作国家/地区">
          <el-input v-model="filmInfo.country"></el-input>
        </el-form-item>
        <el-form-item label="剧情介绍">
          <el-input type="textarea" v-model="filmInfo.brief" :autosize="{ minRows: 6, maxRows: 12}"></el-input>
        </el-form-item>
        <el-form-item label="影片海报">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:9528/api/upFilmPhoto"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="filmInfo.film_photo" :src="filmInfo.film_photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="addFilmData">保存</el-button>
          <goBack></goBack>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addFilm,getFilmDetail } from "@/api/film";
import goBack from "@/components/Backone/index";
export default {
  components:{
    goBack
  },
  data() {
    return {
      list: null,
      listLoading: true,
      searchName: null, //搜索关键字
      filmInfo: {
        film_name: "", //影片名称
        alias: "", //别名
        film_photo: "", //影片海报
        film_long: "", //影片时长
        film_type: "", //影片类型
        actors: "", //演员
        director: "", //导演
        brief: "", //简介
        country: "", //制作国家
        language: [], //语言
        _language: "",
        release_date: "", //上映日期
        film_version: [], //影片版本
        _film_version: ""
      }
    }
  },
  methods: {
    //添加多选项方法
    addFn(field) {
      let thisArr = this.filmInfo[field];
      this.filmInfo["_" + field] && thisArr.push(this.filmInfo["_" + field]);
      this.filmInfo[field] = [...new Set(thisArr)];
    },
    //移除多选项方法
    rmFn(field, index) {
      this.filmInfo[field].splice(index, 1);
    },
    //添加影片
    addFilmData() {
      let params = { ...this.filmInfo };
      params.language = params.language.join("/");
      params.film_version = params.film_version.join("/");
      addFilm(params).then(res => {
        let { msg, data } = res;
        this.$message({
          message: msg,
          type: "success"
        });
      });
    },
    //获取影片信息
    getFilmDetailData(film_id){
      getFilmDetail({_id:film_id}).then(res=>{
        let {data} = res;
        data.language= data.language.split('/');
        data.film_version= data.film_version.split('/');
        this.filmInfo = data;
      })
    },
    //回显图片
    handleAvatarSuccess(res, file) {
      this.filmInfo.film_photo = res.data.imgUrl;
    },
    //图片上传前验证
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  mounted(){
    let film_id = this.$route.query._id;
    if(film_id){
      this.getFilmDetailData(film_id);
    }
  }
}
</script>
<style lang="scss">
#film {
  .selected-box {
    display: inline-block;
    background: #409eff;
    padding: 0 8px;
    margin-right: 10px;
    font-size: 12px;
    color: #fff;
    height: 26px;
    line-height: 26px;
    border-radius: 4px;
    cursor: pointer;
    b {
      margin-left: 5px;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 160px;
    height: 237px;
    display: block;
  }
}
</style>
