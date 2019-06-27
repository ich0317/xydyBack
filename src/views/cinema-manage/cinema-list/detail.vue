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
        <el-form-item label="所在地">
          <el-cascader
            placeholder="请选择"
            :options="cityOptions"
            v-model="cinemaInfo.area"
            style="width:350px;"
            @change="changeArea"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="cinemaInfo.address"></el-input>
        </el-form-item>
        <el-form-item label="定位影院">
          <el-input v-model="cinemaInfo.lat_lng"></el-input>
          <div id="container" ref="container"></div>
        </el-form-item>
        <el-form-item label="服务费">
          <el-input v-model="cinemaInfo.serve_price" style="width:120px;"></el-input>&nbsp;&nbsp;元
        </el-form-item>
        <el-form-item label="停售时间">
          <el-input v-model="cinemaInfo.stop_sale" style="width:120px;"></el-input>&nbsp;&nbsp;开场后/分
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="cinemaInfo.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item>
          <goBack></goBack>
          <el-button type="primary" size="medium" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addCinema } from "@/api/cinema";
import goBack from "@/components/Backone/index";
import city from "@/utils/city";
export default {
  components: {
    goBack
  },
  data() {
    return {
      listLoading: true,
      cityOptions: city,
      cinemaInfo: {
        cinema_name: "", //影院名称
        area: [], //所在城市
        address: "", //详细地址
        lat_lng: "", //影院坐标
        serve_price: 0, //服务费
        stop_sale: 0, //停售时间
        status: true //状态
      },
      markers:[]  //地图标志
    };
  },
  mounted() {
    this.cinemaInfo = { ...this.cinemaInfo, ...this.$route.query };
    this.getQQMark();
  },
  methods: {
    //新增
    onSubmit() {
      addCinema(this.cinemaInfo).then(res => {
        let { msg, data } = res;
        this.$message({
          message: msg,
          type: "success"
        });
        //this.$router.go(-1);
      });
    },
    changeArea(val){
      this.clearOverlays(this.markers);
      this.searchService.search(val[0]);
    },
    clearOverlays(overlays){
      var overlay;
        while ((overlay = overlays.pop())) {
          overlay.setMap(null);
        }
    },
    //qq地图
    getQQMark(lat = 39.916527, lng = 116.397128) {
      var _this = this;
      var map = new qq.maps.Map(document.getElementById("container"), {
        center: new qq.maps.LatLng(lat, lng),
        zoom: 13
      });
      //添加监听事件   获取鼠标单击事件
      qq.maps.event.addListener(map, "click", function(event) {
        var marker = new qq.maps.Marker({
          position: event.latLng,
          map: map
        });
        qq.maps.event.addListener(map, "click", function(event) {
          marker.setMap(null);
        });
        var latLng = event.latLng;
        var lat = latLng.getLat().toFixed(5); //维度
        var lng = latLng.getLng().toFixed(5); //经度
        _this.cinemaInfo.lat_lng = `${lat},${lng}`;

        var g = new qq.maps.Geocoder();
        var post = new qq.maps.LatLng(lat, lng)
        g.getAddress(post);
        g.setComplete(function(r){
          console.log(r);
          _this.cinemaInfo.address=r.detail.address + r.detail.nearPois[0].name || '';
          //if(_this.cinemaInfo.area.length == 0){}

            _this.cinemaInfo.area = [r.detail.addressComponents.province,r.detail.addressComponents.city];
          
        })
      });

      
      /**
       * 检索地址
       */
      var latlngBounds = new qq.maps.LatLngBounds();
      //设置Poi检索服务，用于本地检索、周边检索
      _this.searchService = new qq.maps.SearchService({
 
        //设置搜索范围为北京
        location: "北京",
        //设置搜索页码为1
        pageIndex: 1,
        //设置每页的结果数为5
        pageCapacity: 5,
        //设置展现查询结构到infoDIV上
        panel: document.getElementById("infoDiv"),
        //设置动扩大检索区域。默认值true，会自动检索指定城市以外区域。
        autoExtend: true,
        //检索成功的回调函数
        complete: function(results) {
          //设置回调函数参数
          var pois = results.detail.pois;
          for (var i = 0, l = pois.length; i < l; i++) {
            var poi = pois[i];
            //扩展边界范围，用来包含搜索到的Poi点
            latlngBounds.extend(poi.latLng);
          }
          //调整地图视野
          map.fitBounds(latlngBounds);
        },
        //若服务请求失败，则运行以下函数
        error: function() {
          alert("出错了。");
        }
      });
    }
  }
};
</script>
<style lang="scss">
#cinema {
  #container {
    min-width: 700px;
    min-height: 400px;
    margin-top: 10px;
    border: 1px solid #ddd;
  }
}
</style>

