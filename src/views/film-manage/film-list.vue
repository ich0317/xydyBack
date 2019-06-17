<template>
  <div id="film">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">查询条件</div>
          <div class="pan-form">
            <el-form :inline="true" label-width="80px" class="demo-form-inline">
              <el-form-item label="影片名称">
                <el-input placeholder="影片名称" v-model="searchCond.film_name"></el-input>
              </el-form-item>
              <el-form-item label="上映日期">
                <el-date-picker
                  v-model="searchCond.release_date"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button @click="addFilm">添加影片</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="content-box">
      <el-table :data="list" stripe style="width: 100%" element-loading-text="Loading" v-loading="listLoading">
        <el-table-column prop="film_name" label="影片名称" width="220"></el-table-column>
        <el-table-column prop="release_date" label="上映日期" width="150"></el-table-column>
        <el-table-column prop="language" label="语言" width="150"></el-table-column>
        <el-table-column prop="film_type" label="类型" width="180"></el-table-column>
        <el-table-column prop="film_version" label="版本"></el-table-column>
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
import { getFilmList, delFilm } from "@/api/film";
export default {
  filters: {},
  data() {
    return {
      list: null,
      listLoading: true,
      searchCond: {
        film_name:'',
        release_date:[]
      } 
    }
  },
  mounted() {
    this.getFilmListData();
  },
  methods: {
    //添加影片
    addFilm() {
      this.$router.push({
        name: "film-detail"
      });
    },
    //获取影片
    getFilmListData(searchCond = {}) {
      this.listLoading=true;
      getFilmList(searchCond).then(res => {
        let { msg, data } = res;
        this.list = data;
        this.listLoading=false;
      });
    },
    //搜索
    search(){
      this.getFilmListData(this.searchCond);
    },
    //编辑
    edit(row){
      this.$router.push({
        name:'film-detail',
        query:{_id:row._id}
      });
    },
    //删除
    del(row){
      this.$confirm(`群定要删除${row.film_name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delFilm({ _id: row._id }).then(res => {
            let { data, msg } = res;
            this.$message({
              message: msg,
              type: "success"
            });
            this.getFilmListData();
          });
        })
    }
  }
}
</script>
<style lang="scss">
</style>
