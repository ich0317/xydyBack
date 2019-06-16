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
          订单号：2019061409380120859
        </el-col>
        <el-col :span="12">
          订单状态：已关闭
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          下单时间：2019-06-14 09:38:02
        </el-col>
        <el-col :span="12">
          账号：8352
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
          影院名称：广西外国语学院
        </el-col>
        <el-col :span="12">
          影厅：中教华影校园影院
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          影片名称：盗墓笔记
        </el-col>
        <el-col :span="12">
          影片类型：2D
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          影片票价：5.00 * 2
        </el-col>
        <el-col :span="12">
          已选座位：1层9排9座,1层9排12座
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          放映日期：2019-06-14 19:00
        </el-col>
        <el-col :span="12">
          取票码：12221212
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
          交易号：
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          订单金额：12
        </el-col>
        <el-col :span="12">
          服务费：0.00 * 2
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          实际支付：0.00
        </el-col>
      </el-row>
    </div>
    <div class="content-box order-detail">
        <el-button>返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  filters: {},
  data() {
    return {
      list: null,
      listLoading: true
    };
  },
  created() {
    
  },
  methods: {
    
  }
};
</script>
<style lang="scss">
#order{
  .order-detail{ font-size: 14px; color: #666; width: 800px;}
  .el-row{
    padding: 10px 0;
  }
}
</style>
