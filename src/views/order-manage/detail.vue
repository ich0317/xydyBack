<template>
  <div id="order">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">订单信息</div>
        </div>
      </el-col>
    </el-row>
    <div class="content-box order-detail">
      <el-row>
        <el-col :span="12">
          订单号：{{detail.order_num}}
        </el-col>
        <el-col :span="12">
          订单状态：{{orderStatus}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          下单时间：{{detail.order_datetime}}
        </el-col>
        <el-col :span="12">
          账号：{{detail.username}}
        </el-col>
      </el-row>
    </div>

    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">影票信息</div>
        </div>
      </el-col>
    </el-row>
    <div class="content-box order-detail">
      <el-row>
        <el-col :span="12">
          影院名称：{{detail.cinema_name}}
        </el-col>
        <el-col :span="12">
          影厅：{{detail.screen_name}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          影片名称：{{detail.film_name}}
        </el-col>
        <el-col :span="12">
          影片类型：{{detail.film_version}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          影片票价：{{detail.sell_price}} * {{detail.seat && detail.seat.length}}
        </el-col>
        <el-col :span="12">
          已选座位：{{detail.seat | seatFormat}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          放映日期：{{detail.start_datetime}}
        </el-col>
        <el-col :span="12">
          取票码：{{detail.order_num}}
        </el-col>
      </el-row>
    </div>

    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">支付信息</div>
        </div>
      </el-col>
    </el-row>
    <div class="content-box order-detail">
      <el-row>
        <el-col :span="12">
          支付方式：微信支付
        </el-col>
        <el-col :span="12">
          交易号：{{detail.order_num}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          订单金额：{{detail.total_price}}
        </el-col>
        <el-col :span="12">
          服务费：{{detail.serve_price / (detail.seat && detail.seat.length) }} * {{detail.seat && detail.seat.length}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          实际支付：{{detail.pay_price}}
        </el-col>
      </el-row>
    </div>
    <div class="content-box order-detail">
        <goBack></goBack>
    </div>
  </div>
</template>

<script>
import { getOrderDetail } from "@/api/order";
import goBack from "@/components/Backone/index";
export default {
  components: { goBack },
  filters: {
    seatFormat:function(v){
      return v.join(',');
    }
  },
  data() {
    return {
      detail: { },
      listLoading: true,
      ORDER_STATUS:{
        0:'待支付',
        1:'已支付',
        2:'已退款',
        3:'已关闭'
      }
    }
  },
  created() {
    getOrderDetail({order_id:this.$route.query.order_id}).then(res=>{
      let { msg, data } = res;
      this.detail = data;
    })
  },
  methods: {
    
  },
  computed:{
    orderStatus(){
      return this.ORDER_STATUS[this.detail.status]
    }
  }
}
</script>
<style lang="scss">
#order{
  .order-detail{ font-size: 14px; color: #666; width: 800px;}
  .el-row{
    padding: 10px 0;
  }
}
</style>
