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
          <el-input></el-input>
        </el-form-item>
        
        <el-form-item label="文章简介" style="width:660px;">
          <el-input type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="列表图片" style="width:660px;">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章" style="width:1000px;">
          <tinymce v-model="content" :height="300" />
        </el-form-item>
        <el-form-item label="发布日期" style="width:660px;">
          <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="发布状态" style="width:660px;">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存</el-button>
          <el-button>返回</el-button>
        </el-form-item>
        
      </el-form>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {
  filters: {},
  components: { Tinymce },
  data() {
    return {
      list: [],
      listLoading: true,
      content:""
    };
  },
  created() {},
  methods: {
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  }
};
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
} 
</style>
