<template>
  <div id="film">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">查询条件</div>
          <div class="pan-form">
            <el-form :inline="true" label-width="80px" class="demo-form-inline">
              <el-form-item label="影片名称">
                <el-input placeholder="影片名称" size="medium" v-model="searchCond.film_name"></el-input>
              </el-form-item>
              <el-form-item label="上映日期">
                <el-date-picker
                  v-model="searchCond.release_date"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  size="medium"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="medium" @click="search">查询</el-button>
                <el-button size="medium" @click="addFilm">添加影片</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="content-box">
      <el-table
        :data="list"
        stripe
        style="width: 100%"
        element-loading-text="Loading"
        v-loading="listLoading"
      >
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
    <div class="page-wrap">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="changePage"
        :current-page="pageInfo.page"
        :page-size="pageInfo.page_size"
        :total="pageInfo.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getFilmList, delFilm } from "@/api/film";
import { stampToTime } from "@/utils/index";
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      searchCond: {
        film_name: "",
        release_date: []
      },
      //分页信息
      pageInfo: {
        total: 0,
        page_size: 10,
        page: 1
      }
    };
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
      this.listLoading = true;
      getFilmList({ ...searchCond, ...this.pageInfo }).then(res => {
        let { msg, data,code } = res;
      
        data.film.forEach(v => {
          v.release_date = stampToTime(v.release_date, "YMD");
        });
        this.list = data.film;
        this.pageInfo.total = data.total;
        this.listLoading = false;
      });
    },
    //搜索
    search() {
      this.pageInfo.page = 1;
      this.getFilmListData(this.searchCond);
    },
    //编辑
    edit(row) {
      this.$router.push({
        name: "film-detail",
        query: { _id: row._id }
      });
    },
    //删除
    del(row) {
      this.$confirm(`群定要删除${row.film_name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delFilm({ _id: row._id }).then(res => {
          let { data, msg } = res;
          this.$message({
            message: msg,
            type: "success"
          });
          this.getFilmListData();
        });
      });
    },
    //分页
    changePage(val) {
      this.pageInfo.page = val;
      this.getFilmListData();
    }
  }
};
</script>
<style lang="scss">
</style>
