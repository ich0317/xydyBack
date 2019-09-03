<template>
  <div id="order">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">查询条件</div>
          <div class="pan-form">
            <el-form :inline="true" label-width="80px" class="demo-form-inline">
              <el-form-item label="下单日期">
                <el-date-picker
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="medium"
                  v-model="searchCond.orderDateTime"
                  value-format="yyyy-MM-dd"
                  :default-time="['00:00:00', '23:59:59']"
                  style="width:280px;"
                  >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="影片名称">
                <el-input placeholder="影片名称" size="medium" v-model="searchCond.film_name"></el-input>
              </el-form-item>
              <el-form-item label="订单号">
                <el-input placeholder="订单号" size="medium" v-model="searchCond.order_num"></el-input>
              </el-form-item>
              <el-form-item label="用户">
                <el-input placeholder="用户" size="medium" v-model="searchCond.username"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="medium" @click="search">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="content-box">
      <el-table :data="listFormat" stripe style="width: 100%" element-loading-text="Loading" v-loading="listLoading">
        <el-table-column prop="username" label="用户" width="160"></el-table-column>
        <el-table-column prop="order_num" label="订单号" width="180"></el-table-column>
        <el-table-column prop="order_datetime" label="下单日期" width="180"></el-table-column>
        <el-table-column prop="film_name" label="影片名称" width="180"></el-table-column>
        <el-table-column prop="cinema_name" label="影院名称" width="150"></el-table-column>
        <el-table-column prop="seat" label="购买张数" width="80" align="center"></el-table-column>
        <el-table-column prop="total_price" label="订单金额（元）" width="100" align="center"></el-table-column>
        <el-table-column prop="pay_price" label="支付金额（元）" width="100" align="center"></el-table-column>
        <el-table-column prop="serve_price" label="服务费（元）" width="100" align="center"></el-table-column>
        <el-table-column prop="status" label="订单状态"  align="center">
          <template slot-scope="scope" width="100">
          <span :class="{'payed':scope.row.status == '已支付','unpay':scope.row.status == '待支付','refund':scope.row.status == '已退款','closed':scope.row.status == '已关闭'}">
            {{scope.row.status}}
          </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" width="100">
            <el-button @click="view(scope.row._id)" type="primary" size="mini">查看</el-button>
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
import { getOrder } from "@/api/order";
import { stampToTime } from "@/utils/index";
export default {
  data() {
    return {
      list: [],
      listLoading: null,
      searchCond:{
        orderDateTime:[stampToTime(new Date(),'YMD'),stampToTime(new Date(),'YMD')],
        film_name:'',
        order_num:'',
        username:''
      },
      pageInfo:{
        page:1,
        page_size:10,
        total:null
      },
      ORDER_STATUS:{
        0:'待支付',
        1:'已支付',
        2:'已退款',
        3:'已关闭'
      }
    }
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    getOrderList(){
      this.listLoading = true;
      getOrder({...this.searchCond, ...this.pageInfo}).then(res=>{
        let {data, mag, code} = res;
        this.list = data.list;
        this.pageInfo.total = data.total;
        this.listLoading = false;
      })
    },
    //搜索
    search(){
      this.pageInfo.page = 1;
      this.getOrderList();
    },
    changePage(val){
      this.pageInfo.page = val;
      this.getOrderList();
    },
    view(id){
      this.$router.push({
        name:"order-detail",
        query:{
          order_id:id
        }
      });
    }
  },
  computed:{
    listFormat(){
      this.list.forEach(v=>{
        v.status = this.ORDER_STATUS[v.status];
        v.seat = v.seat.length;
      })
      return this.list;
    }
  }
}
</script>
<style lang="scss">
#order{
  .payed{ color: #67c23a;}
  .unpay{ color: #e6a23c;}
  .refund{ color: #E71010;}
  .closed{ color: #999;}
}

</style>
