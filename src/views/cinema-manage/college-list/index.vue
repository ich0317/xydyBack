<template>
  <div id="college">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">查询条件</div>
          <div class="pan-form">
            <el-form :inline="true" label-width="80px" class="demo-form-inline">
              <el-form-item label="学校名称">
                <el-input placeholder="学校名称" size="medium" v-model="searchName"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="medium" @click="searchCollege">查询</el-button>
                <el-button size="medium" @click="addCollege">添加学校</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="content-box">
      <el-table :data="list" stripe style="width: 100%" element-loading-text="Loading" v-loading="listLoading">
        <el-table-column prop="college_name" label="学校名称" width="220"></el-table-column>
        <el-table-column prop="province" label="省" width="150"></el-table-column>
        <el-table-column prop="city" label="市" width="150"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
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
  data() {
    return {
      list: null,
      listLoading: true,
      searchName:null //搜索关键字
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    //获取
    fetchData(searchName = "") {
      this.listLoading = true;
      getCollegeList({college_name:searchName}).then(res => {
        let { data, msg } = res;
        this.list = data;
        this.listLoading = false;
      });
    },
    //添加
    addCollege() {
      this.$router.push({
        name: "college-detail"
      });
    },
    //修改
    edit(row) {
      this.$router.push({
        name: "college-detail",
        query: row
      });
    },
    //删除
    del(row) {
      this.$confirm(`群定要删除${row.college_name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delCollege({ _id: row._id }).then(res => {
            let { data, msg } = res;
            this.$message({
              message: msg,
              type: "success"
            });
            this.fetchData();
          });
        })
        .catch(() => {});
    },
    //查询
    searchCollege(){
      this.fetchData(this.searchName);
    },
    //进入影院
    inCinema(row){
      this.$router.push({
        name:"cinema-list",
        query:{
          college_id:row._id
        }
      });
    }
  }
}
</script>
<style lang="scss">
</style>
