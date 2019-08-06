<template>
  <div id="news">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">基础信息</div>
        </div>
      </el-col>
    </el-row>
    <div class="content-box">
      <el-form ref="form" label-width="110px">
        <el-form-item label="文章标题" style="width:660px;">
          <el-input v-model="articleInfo.title"></el-input>
        </el-form-item>
        
        <el-form-item label="文章简介" style="width:660px;">
          <el-input type="textarea" v-model="articleInfo.brief"></el-input>
        </el-form-item>
        <el-form-item label="列表图片" style="width:660px;">
          <el-upload
            class="avatar-uploader"
            :action="baseUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="articleInfo.img_url" :src="articleInfo.img_url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章" style="width:1000px;">
          <tinymce v-model="articleInfo.content" :height="300" />
        </el-form-item>
        <el-form-item label="发布日期" style="width:660px;">
          <el-date-picker type="date" placeholder="选择日期" v-model="articleInfo.release_date"></el-date-picker>
        </el-form-item>
        <el-form-item label="发布状态" style="width:660px;">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949" v-model="articleInfo.status">
             
          </el-switch>
        </el-form-item>
        <el-form-item>
          <goBack></goBack>
          <el-button type="primary" @click="addArticle">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { addNews, getNewsDetail } from "@/api/news";
import goBack from "@/components/Backone/index";
import { stampToTime } from "@/utils/index";

export default {
  filters: {},
  components: { Tinymce, goBack },
  data() {
    return {
      list: [],
      listLoading: true,
      articleInfo:{
        title:'',
        brief:'',
        img_url:'',
        content:'',
        release_date:new Date(),
        status:true
      },
      articleId:null,
      baseUrl:''
    }
  },
  created(){
    this.baseUrl = `${process.env.VUE_APP_BASE_API}api/upFilmPhoto`;
    this.articleId = this.$route.query._id;
  },
  mounted(){
    if(this.articleId){
      this.getArticle();
    }
  },
  methods: {
    //添加文章
    addArticle(){
      this.articleInfo.release_date = stampToTime(this.articleInfo.release_date,'YMDhms');
      addNews({...this.articleInfo, _id:this.articleId}).then(res=>{
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.$router.go(-1);
      });
    },
    //获取文章
    getArticle(){
      getNewsDetail({_id:this.articleId}).then(res=>{
        this.articleInfo = res.data;
      })
    },
    //回显图片
    handleAvatarSuccess(res, file) {
      this.articleInfo.img_url = res.data.imgUrl;
    },
    //图片上传前验证
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
}
</script>
<style lang="scss">
#news{
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 345px;
    height: 172px;
    line-height: 172px;
    text-align: center;
  }
  .avatar {
    width: 345px;
    height: 172px;
    display: block;
  }
} 
</style>
