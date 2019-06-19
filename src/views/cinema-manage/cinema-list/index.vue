<template>
  <div id="cinema">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">查询条件</div>
          <div class="pan-form">
            <el-form :inline="true" label-width="80px" class="demo-form-inline">
              <el-form-item label="影院名称" v-if="!college_id">
                <el-input placeholder="影院名称" v-model="searchName" size="medium"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="medium" @click="search" v-if="!college_id">查询</el-button>
                <el-button @click="addCinema" size="medium" v-if="college_id">添加影院</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="content-box">
      <el-table :data="list" stripe style="width: 100%" element-loading-text="Loading" v-loading="listLoading">
        <el-table-column prop="cinema_name" label="影院名称" width="220"></el-table-column>
        <el-table-column prop="screen_amount" label="影厅数量" width="150"></el-table-column>
        <el-table-column prop="worker_name" label="管理人" width="150"></el-table-column>
        <el-table-column prop="worker_tel" label="联系方式" width="150"></el-table-column>
        <el-table-column prop="_cinema_status" label="状态" ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" width="100">
            <el-button @click="edit(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="inScreen(scope.row)" size="mini">影厅</el-button>
            <el-button @click="inPlan(scope.row)" type="warning" size="mini">排期</el-button>
            <el-button @click="del(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getCinemaList, delCinema } from "@/api/cinema";
export default {
  filters: {},
  data() {
    return {
      list: null,
      listLoading: true,
      college_id:'',//上一级页面带过来
      searchName:null
    }
  },
  mounted() {
    let {college_id } = this.$route.query;
    
    this.college_id = college_id;
    this.getCinema();
  },
  methods: {
    //添加影院
    addCinema(){
      this.$router.push({
        name:"cinema-detail",
        query:{
          college_id:this.college_id
        }
      });
    },
    //获取影院
    getCinema(searchName = ""){
      let searchCond = null;
      if(searchName){
        searchCond = {cinema_name:searchName};
      }else{
        searchCond = {college_id:this.college_id};
      }
      this.listLoading=true;
      getCinemaList(searchCond).then(res=>{
        let {data,msg}=res;
         this.list = data.map(v=>{
          v._cinema_status = v.cinema_status ? '启用' : '停用';
          return v;
        })
        this.listLoading=false;
      })
    },
    //编辑影院
    edit(row){
  
      this.$router.push({
        name:"cinema-detail",
        query:row
      })
    },
    //搜索
    search(){
      this.getCinema(this.searchName);
    },
    //影厅
    inScreen(row){
      this.$router.push({
        name:'screen-list',
        query:{
          cinema_id:row._id
        }
      });
    },
    //删除
    del(row){
      this.$confirm(`群定要删除${row.cinema_name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delCinema({ _id: row._id }).then(res => {
            let { data, msg } = res;
            this.$message({
              message: msg,
              type: "success"
            });
            this.getCinema();
          });
        })
        .catch(() => {});
    },
    //排期
    inPlan(row){
      this.$router.push({
        name:"plan"
      });
    }
  }
}
</script>
