<template>
  <div id="user">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">查询条件</div>
          <div class="pan-form">
            <el-form :inline="true" label-width="80px" class="demo-form-inline">
              <el-form-item label="文章标题">
                <el-input placeholder="文章标题" ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button>添加文章</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="content-box">
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="article_title" label="文章标题" width="200"></el-table-column>
        <el-table-column prop="editor" label="编辑" width="150"></el-table-column>
        <el-table-column prop="date" label="发布日期" width="150"></el-table-column>
        <el-table-column prop="views" label="阅读量" width="150"></el-table-column>
        <el-table-column prop="status" label="发布状态"></el-table-column>
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
export default {
  filters: {},
  data() {
    return {
      list: [
        {
          article_title:"影院如何发布影片",
          editor:"大元",
          date:"2019-05-12",
          views:"153",
          status:"已发布"
        }
      ],
      listLoading: true,
      searchName:null //搜索关键字
    };
  },
  created() {
    
  },
  methods: {
    edit(){
      this.$router.push({
        name:"news-detail"
      });
    }
  }
};
</script>
<style lang="scss">
</style>
