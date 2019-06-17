<template>
  <div id="cinema">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">基础信息</div>
        </div>
      </el-col>
    </el-row>
    <div class="content-box">
      <el-form ref="form" label-width="110px" style="width:460px;">
        <el-form-item label="影院名称">
          <el-input v-model="cinemaInfo.cinema_name"></el-input>
        </el-form-item>
        <el-form-item label="影厅数量">
          <el-input v-model="cinemaInfo.screen_amount"></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="cinemaInfo.worker_name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="cinemaInfo.worker_tel"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="cinemaInfo.cinema_status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <goBack></goBack>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addCinema } from "@/api/cinema";
import goBack from "@/components/Backone/index";
export default {
  filters: {},
  components:{
    goBack
  },
  data() {
    return {
      listLoading: true,
      cinemaInfo:{
        cinema_name:'',
        screen_amount:'',
        worker_name:'',
        worker_tel:'',
        college_id:'',
        cinema_status:true
      }
    }
  },
  mounted() {
    this.cinemaInfo = {...this.cinemaInfo,...this.$route.query};
  },
  methods: {
    //新增
    onSubmit(){
      addCinema(this.cinemaInfo).then(res=>{
        let {msg,data} = res;
        this.$message({
          message: msg,
          type: 'success'
        });
      })
    },
    //编辑
  }
}
</script>
