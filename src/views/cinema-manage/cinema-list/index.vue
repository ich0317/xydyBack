<template>
  <div id="cinema">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">查询条件</div>
          <div class="pan-form">
            <el-form :inline="true" label-width="80px" class="demo-form-inline">
              <el-form-item label="所在城市">
                <el-cascader placeholder="请选择" size="medium" :options="cityOptions"></el-cascader>
              </el-form-item>
              <el-form-item label="影院名称">
                <el-input placeholder="影院名称" size="medium" v-model="searchName"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="medium">查询</el-button>
                <el-button size="medium" @click="addCinema">添加影院</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="content-box">
      <el-table :data="list" stripe style="width: 100%" element-loading-text="Loading" v-loading="listLoading">
        <el-table-column prop="cinema_name" label="影院名称" width="220"></el-table-column>
        <el-table-column prop="area" label="省市" width="200"></el-table-column>
        <el-table-column prop="address" label="地址" width="280"></el-table-column>
        <el-table-column prop="serve_price" label="服务费" width="100"></el-table-column>
        <el-table-column prop="_cinema_status" label="状态"></el-table-column>
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
    <div class="page-wrap">
      <el-pagination background layout="prev, pager, next" @current-change="changePage" :current-page="pageInfo.page" :page-size="pageInfo.page_size" :total="pageInfo.total"></el-pagination>
    </div>
  </div>
</template>

<script>
import { getCinema, delCinema } from "@/api/cinema";
import goBack from "@/components/Backone/index";
import city from "@/utils/city";
export default {
  components:{
    goBack
  },
  data() {
    return {
      list: null,
      listLoading: true,
      college_id:'',//上一级页面带过来
      searchName:null,
      cityOptions:city,
      //分页信息
      pageInfo:{
        total:0,
        page_size:10,
        page:1
      }
    }
  },
  mounted() {
    let {college_id } = this.$route.query;
    this.college_id = college_id;
    this.getCinemaData();
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
    getCinemaData(){
      this.listLoading=true;
      getCinema(this.pageInfo).then(res=>{
        let {data, msg}= res;
         this.list = data.data.map(v=>{
          v._cinema_status = v.status ? '启用' : '停用';
          v.area = `${v.province.split(',')[0]} ${v.city.split(',')[0]}`;
          return v;
        })
        this.pageInfo.total = data.total;
        this.listLoading=false;
      })
    },
    //编辑影院
    edit(row){
  
      this.$router.push({
        name:"cinema-detail",
        query:{
          cinema_id:row._id
        }
      })
    },
    //搜索
    search(){
      this.getCinemaData(this.searchName);
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
      this.$confirm(`确定要删除${row.cinema_name}?`, "提示", {
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
            this.getCinemaData();
          });
        })
        .catch(() => {});
    },
    //排期
    inPlan(row){
      this.$router.push({
        name:"plan",
        query:{
          cinema_id:row._id
        }
      });
    },
    //添加影院
    addCinema(){
      this.$router.push({
        name:"cinema-detail"
      })
    },
    changePage(val){
      this.pageInfo.page = val;
      this.getCinemaData();
    }
  }
}
</script>
