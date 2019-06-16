<template>
  <div id="order">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">查询条件</div>
          <div class="pan-form">
            <el-form :inline="true" label-width="80px" class="demo-form-inline">
              <el-form-item label="影片名称">
                <el-input placeholder="影片名称" ></el-input>
              </el-form-item>
              <el-form-item label="订单号">
                <el-input placeholder="订单号" ></el-input>
              </el-form-item>
              <el-form-item label="下单日期">
                <el-date-picker
                  v-model="order_date"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="content-box">
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="order_num" label="订单号" width="200"></el-table-column>
        <el-table-column prop="film_name" label="影片名称" width="200"></el-table-column>
        <el-table-column prop="college_name" label="学校名称" width="150"></el-table-column>
        <el-table-column prop="cinema_name" label="影院名称" width="150"></el-table-column>
        <el-table-column prop="screen_name" label="影厅" width="150"></el-table-column>
        <el-table-column prop="order_price" label="订单金额" width="150"></el-table-column>
        <el-table-column prop="status" label="订单状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" width="100">
            <el-button @click="view(scope.row)" type="primary" size="mini">查看</el-button>
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
      list: [
        {
          order_num:"20192536001247",
          film_name:"大人物",
          college_name:"清华大学",
          cinema_name:"清华大礼堂",
          screen_name:"杜比影音",
          order_price:"12.5",
          status:"已完成"
        }
      ],
      listLoading: true,
      searchName:null, //搜索关键字
      order_date:[]
    };
  },
  created() {
    
  },
  methods: {
    view(){
      this.$router.push({
        name:"order-detail"
      });
    }
  }
};
</script>
<style lang="scss">
</style>
