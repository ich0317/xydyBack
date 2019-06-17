<template>
  <div id="college">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">基础信息</div>
        </div>
      </el-col>
    </el-row>
    <div class="content-box">
      <el-form ref="form" label-width="110px" style="width:460px;">
        <el-form-item label="学校名称">
          <el-input v-model="collegeInfo.college_name"></el-input>
        </el-form-item>
        <el-form-item label="所在地">
          <el-cascader placeholder="请选择" :options="cityOptions" v-model="collegeInfo.area" style="width:350px;"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="collegeInfo.address"></el-input>
        </el-form-item>
        <el-form-item label="地图定位">
          <el-input v-model="collegeInfo.mark"></el-input>
          <div id="container" ref="container"></div>
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
import city from "@/utils/city";
import { addCollege } from "@/api/cinema";
import goBack from "@/components/Backone/index";
export default {
  components:{
    goBack
  },
  data() {
    return {
      list: null,
      listLoading: true,
      cityOptions:city,
      collegeInfo:{
        college_name:'',
        area:[],
        address:'',
        mark:'',
        college_id:''
      }
    }
  },
  mounted(){
    let collegeDetail = this.$route.query;
    if(collegeDetail._id){
      collegeDetail.college_id = collegeDetail._id;
      collegeDetail.area = [collegeDetail.province, collegeDetail.city];
      collegeDetail.mark = `${collegeDetail.latitude},${collegeDetail.longitude}`;
      this.collegeInfo = collegeDetail;
    }
    this.getQQMark(collegeDetail.latitude,collegeDetail.longitude);
  },
  methods: {
    //qq地图
    getQQMark(lat =39.916527, lng = 116.397128){
      var _this = this;

      var map = new qq.maps.Map(document.getElementById("container"),{
          center: new qq.maps.LatLng(lat,lng),
          zoom: 13
      });
      //添加监听事件   获取鼠标单击事件
      qq.maps.event.addListener(map, 'click', function(event) {
        var marker=new qq.maps.Marker({
              position:event.latLng, 
              map:map
          });    
          qq.maps.event.addListener(map, 'click', function(event) {
              marker.setMap(null);      
          });
          var latLng = event.latLng;
          var lat = latLng.getLat().toFixed(5); //维度
          var lng = latLng.getLng().toFixed(5); //经度
          _this.collegeInfo.mark = `${lat},${lng}`;
      });
    },
    //保存学校信息
    onSubmit(){
      addCollege(this.collegeInfo).then(res => {
        let {data, msg} = res;
        this.$message({
          message: msg,
          type: 'success'
        });
        this.collegeInfo={
          college_name:'',
          area:[],
          address:'',
          mark:'',
          college_id:""
        }
      })
    }
  }
}
</script>
<style lang="scss">
#college {
  #container{
    min-width:700px;
    min-height:400px;
    margin-top: 10px;
    border: 1px solid #ddd;
  }
}
</style>
