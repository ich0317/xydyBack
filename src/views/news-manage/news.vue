<template>
  <div id="user">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">查询条件</div>
          <div class="pan-form">
            <el-form :inline="true" label-width="80px" class="demo-form-inline">
              <el-form-item label="文章标题">
                <el-input size="medium" placeholder="文章标题" ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="medium" type="primary">查询</el-button>
                <el-button size="medium" @click="addArticle">添加文章</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="content-box">
      <el-table :data="list" stripe style="width: 100%" element-loading-text="Loading"
        v-loading="listLoading">
        <el-table-column prop="title" label="文章标题" width="280"></el-table-column>
        <el-table-column prop="editor" label="编辑" width="150"></el-table-column>
        <el-table-column prop="date" label="发布日期" width="150"></el-table-column>
        <el-table-column prop="views" label="阅读量" width="100"></el-table-column>
        <el-table-column prop="like" label="点赞量" width="100"></el-table-column>
        <el-table-column prop="article_status" label="发布状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" width="100">
            <el-button @click="edit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="del(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
  </div>
</template>

<script>
import { getNewsList, delNews } from "@/api/news";
import { stampToTime } from "@/utils/index";

export default {
  data() {
    return {
      list: [],
      listLoading: true,
      searchName:null //搜索关键字
    }
  },
  mounted() {
    this.getNews();
  },
  methods: {
    getNews(){
      this.listLoading = true;
      getNewsList().then(res=>{
        let {data} = res;
        data.forEach(v => {
          v.date = stampToTime(v.release_date,'YMD');
          v.article_status = v.status ? '已发布' : '未发布';
        })
        this.list = data;
        this.listLoading = false;
      })
    },
    //编辑
    edit(row){
      this.$router.push({
        name:'news-detail',
        query:{
          _id:row._id
        }
      });
    },
    //删除
    del(row){
      this.$confirm(`确定要删除${row.title}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delNews({ _id: row._id }).then(res => {
            let { data, msg } = res;
            this.$message({
              message: msg,
              type: "success"
            });
            this.getNews();
          });
        })
        .catch(() => {});
    },
    //去添加文章
    addArticle(){
      this.$router.push({
        name:'news-detail'
      });
    }
  }
}
</script>
<style lang="scss">
</style>
