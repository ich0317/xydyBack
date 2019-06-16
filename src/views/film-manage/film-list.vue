<template>
  <div id="film">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">查询条件</div>
          <div class="pan-form">
            <el-form :inline="true" label-width="80px" class="demo-form-inline">
              <el-form-item label="影片名称">
                <el-input placeholder="影片名称" ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button @click="addFilm">添加影片</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="content-box">
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="film_name" label="影片名称" width="220"></el-table-column>
        <el-table-column prop="release_date" label="上映日期" width="150"></el-table-column>
        <el-table-column prop="language" label="语言" width="150"></el-table-column>
        <el-table-column prop="film_type" label="类型" width="150"></el-table-column>
        <el-table-column prop="film_version" label="版本"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" width="100">
            <el-button @click="edit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="inCinema(scope.row)" size="mini">影院</el-button>
            <el-button @click="del(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      searchName:null //搜索关键字
    };
  },
  created() {
    
  },
  methods: {
    //添加影片
    addFilm(){
      this.$router.push({
        name:"film-detail"
      });
    }
  }
};
</script>
<style lang="scss">
</style>
