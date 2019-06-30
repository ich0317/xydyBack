<style lang="less" >
.movie_hall {
  height: 36px;
  overflow: hidden;
}
.ghost_btn {
  background: #fff;
}
.ghost_btn:hover {
  color: #6d7380 !important;
  background-color: #fff !important;
  border-color: #e4e5e7 !important;
}
.seat_map {
  position: absolute;
  top: 85px;
  left: 10px;
  right: 10px;
  bottom: 55px;
}
.seat_map_box {
  position: absolute;
  left: 0;
  top: 35px;
  right: 0;
  bottom: 0;
  background: #fff;
  border: 1px solid #ddd;
}
.movie_hall a {
  padding: 0 15px;
  display: inline-block;
  border: 1px solid #ddd;
  border-radius: 4px 4px 0 0;
  background: #f5f7f9;
  position: relative;
  top: 1px;
  z-index: 9;
  margin-right: 5px;
  position: relative;
}
.movie_hall span {
  display: inline-block;
  padding: 7px 0 5px 0;
}
.movie_hall .on {
  background: #fff;
  border-bottom-color: #fff;
}
.add_movie_hall,
.seat_to_map {
  margin-right: 5px;
}
.blue_btn {
  background: #69b9ed;
  border-color: #69b9ed;
}
.set_seat_total {
  float: right;
  margin: 7px 2px 0 0;
}
.ivu-checkbox-wrapper {
  font-size: 14px;
}
.seat_top_bar {
  margin: 10px 20px 0;
  position: relative;
  overflow: hidden;
  height: 36px;
}
.movie_hall_name {
  background: #f5f5f5;
  width: 600px;
  height: 50px;
  border-radius: 80px;
  position: absolute;
  left: 50%;
  margin-left: -300px;
  top: -24px;
  line-height: 74px;
  text-align: center;
}
.seat_wrap {
  overflow: hidden;
  margin: auto;
}
.seat-block {
  background: #69b9ed;
  width: 36px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  float: left;
  margin-right: 10px;
  cursor: pointer;
}

.map li {
  margin-bottom: 10px;
  overflow: hidden;
}

.col-head {
  overflow: hidden;
}

.col-head li {
  width: 36px;
  height: 32px;
  margin-right: 10px;
  float: left;
  text-align: center;
}

.row-head li {
  width: 36px;
  height: 32px;
  line-height: 32px;
  margin-bottom: 10px;
  text-align: center;
}

.disabled {
  background: #fff;
}
.edit {
  width: 30px;
  height: 20px;
  text-align: center;
}
.map .edit {
  border: none;
}
.seat_setbtns .ghost_btn {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  vertical-align: middle;
  cursor: pointer;
}
.scrolls::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.scrolls::-webkit-scrollbar-thumb {
  background: #ccc;
}
.scrolls::-webkit-scrollbar-track {
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.floor_hd {
  position: absolute;
  left: 20px;
  top: 10px;
}
.more_floor {
  float: left;
  margin: 5px 12px 0 0;
}
.floor_list {
  float: left;
}
.foot-btn {
  position: absolute;
  left: 10px;
  bottom: 12px;
}
.saveChangeBtns {
  display: inline-block;
  padding: 4px 15px;
  background: #7e84c9;
  color: #fff;
  border-radius: 4px;
  vertical-align: middle;
  margin-left: 5px;
  cursor: pointer;
  transition-duration: 0.4s;
}
.saveChangeBtns:hover {
  background: #69b9ed;
}
.map_layer {
  background: #fff;
  padding: 14px 16px 20px 16px;
  border-radius: 4px;
  box-shadow: 0 0 2px 2px #ddd;
  width: 275px;
  position: absolute;
  left: 100px;
  top: 100px;
  z-index: 9999;
}
#seatMap .ivu-form-item {
  margin: 0;
}
.mb15 {
  margin-bottom: 15px;
}
.mb20 {
  margin-bottom: 20px;
}
.mr8 {
  margin-right: 8px;
}
.screen_x {
  position: absolute;
  right: 8px;
  top: 6px;
  font-style: normal;
  color: #999;
}
span {
  border: none;
  outline: none;
}
.hall-name {
  padding: 0 2px;
}
.movie_hall_name .ivu-input {
  border: none;
  outline: none;
  text-align: center;
  height: 21px;
  background: none;
  text-align: center;
  cursor: pointer;
}
.movie_hall_name .ivu-input:focus {
  box-shadow: none;
}
.change_seat_map {
  margin-right: 5px;
}
.disabled-shade {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #ccc;
  z-index: 9999;
  opacity: 0;
}
</style>
<template>
  <div id="seatMap">
    <div class="bread">
      <Breadcrumb>
        <BreadcrumbItem>
          <Icon type="home" size="20" color="#7e71bb"></Icon>校园管理
        </BreadcrumbItem>
        <BreadcrumbItem to="/base/college-cinema-list" replace>影院列表</BreadcrumbItem>
        <BreadcrumbItem>{{college_cinema_name}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="seat_setbtns">
      <Button
        type="primary"
        icon="plus-round"
        @click="addMovieHall"
        class="add_movie_hall blue_btn"
      >添加影厅</Button>
      <span
        class="ghost_btn seat_to_map"
        @click="setSeatLayout"
        v-if="statusManagement.isInit != 0"
      >座位布局</span>
      <span
        ref="changeNoBtns"
        class="ghost_btn change_seat_map"
        v-if="statusManagement.isInit != 0"
      >修改座号</span>
      <span
        class="ghost_btn change_seat_map"
        @click="delScreen()"
        v-if="statusManagement.isInit != 0"
      >删除影厅</span>
    </div>
    <div class="seat_map" v-if="statusManagement.isInit != 0">
      <div class="movie_hall clearfix">
        <span class="set_seat_total">座位总数：{{seatsAmount}}</span>

        <a
          href="javascript:;"
          v-for="(item,index) in screenInfo"
          :class="{on:item.screen_no == currentHallId}"
          :key="index"
        >
          <span @click="screenTag(item.id)" :screen_id="item.screen_id">{{item.screen_name}}</span>
          <!-- <em class="screen_x" @click="delScreen(item.id,item.screen_name,item.screen_no)">x</em> -->
        </a>
      </div>
      <div class="seat_map_box">
        <div class="seat_top_bar">
          <div class="movie_hall_name">
            <Input v-model="mapSort.setScreenName" :maxlength="30"></Input>
            <!-- <span contenteditable="true" ref="hallName" class="hall-name">{{currentHallName}}</span>（银幕方向） -->
          </div>
        </div>
        <div class="floor_hd">
          <Checkbox v-model="statusManagement.openMore" class="more_floor">启用二层</Checkbox>
          <Select
            v-model="floor_now"
            v-show="statusManagement.openMore"
            class="floor_list"
            style="width:100px"
            @on-change="changeFloor"
          >
            <Option
              v-for="item in floor_list"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </div>
        <div
          ref="scrolls"
          class="scrolls"
          style="overflow:auto; position:absolute; left:20px; top:60px; right:10px; bottom:10px;"
        >
          <div ref="sWrap" class="seat_wrap">
            <table width="100%" ref="box" id="box">
              <tr>
                <td width="40">&nbsp;</td>
                <td>
                  <ul ref="colHead" class="col-head"></ul>
                </td>
              </tr>
              <tr>
                <td width="40">
                  <ul ref="rowHead" class="row-head"></ul>
                </td>
                <!-- :class="[item.show ? 'seat-block' : 'seat-block disabled']"
                :graph_col="item.graph_col"-->
                <td>
                  <ul ref="map" class="map"></ul>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!--  -->
    <div class="foot-btn" v-if="statusManagement.isInit != 0">
      <Button style @click="goBack()">返回</Button>
      <span ref="saveChangeBtns" class="saveChangeBtns" @click="saveMapSeat()">保存</span>
    </div>

    <!-- 弹窗 -->
    <transition name="fade">
      <!-- 添加影厅 -->
      <div
        ref="layer"
        class="map_layer"
        style="left:12px; top:85px;"
        v-if="statusManagement.setData"
      >
        <Form ref="formTop" :model="formTop" :rules="ruleValidate" label-position="top">
          <FormItem label="影厅名称" prop="movieHallName">
            <Row :gutter="10">
              <Col span="17">
                <Input v-model="formTop.movieHallName" :maxlength="30"></Input>
              </Col>
              <Col span="6">
                <Button type="primary" @click="okMovieName('formTop')">确定</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
      <!-- 座位布局 -->
      <div
        ref="layer"
        class="map_layer"
        style="left:125px; top:85px; line-height:32px;"
        v-if="statusManagement.seatLayout"
      >
        <!-- <Row :gutter="4" class="mb15">
          <Col span="7">影厅名称</Col>
          <Col span="17">
            <Input v-model="mapSort.setScreenName" :maxlength="30"></Input>
          </Col>
        </Row>-->
        <Row :gutter="4" class="mb15">
          <Col span="7">座位布局</Col>
          <Col span="6">
            <Input v-model="mapSort.row" @on-blur="limit('row')"></Input>
          </Col>
          <Col span="2">排</Col>
          <Col span="6">
            <Input v-model="mapSort.col" @on-blur="limit('col')"></Input>
          </Col>
          <Col span="2">列</Col>
        </Row>

        <Row :gutter="4" class="mb15">
          <Col span="7">座位排序</Col>
          <Col span="17">
            <Select v-model="mapSort.sortRow">
              <Option value="tb">从上至下</Option>
              <Option value="bt">从下至上</Option>
            </Select>
          </Col>
        </Row>

        <Row :gutter="4" class="mb15">
          <Col span="7">座位列序</Col>
          <Col span="17">
            <Select v-model="mapSort.sortCol">
              <Option value="lr">从左至右</Option>
              <Option value="rl">从右至左</Option>
            </Select>
          </Col>
        </Row>

        <Row type="flex" justify="end">
          <Col>
            <Button type="ghost" class="mr8" size="large" @click="mapReset">重 置</Button>
            <Button type="primary" size="large" @click="createMap">确 定</Button>
          </Col>
        </Row>
      </div>
    </transition>

    <Modal
      v-model="configlayer"
      title="提示"
      @on-ok="ok"
      @on-cancel="cancel"
      :mdStatus="1"
      :configMsg="1"
      :cancelText="cancelText"
      :okText="okText"
      :width="400"
    >{{configMsg}}</Modal>

    <div
      style="background:fff; left:0; top:0; right:0; bottom:0; position:absolute; z-index:999;"
      v-if="loading"
    >
      <Spin fix>
        <Icon type="load-c" size="30" class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
      </Spin>
    </div>

    <div class="disabled-shade" v-if="!isAllowSet"></div>
  </div>
</template>
  
<script>
import Hammer from "./hammer.min.js";
import CreateMap from "./createSeat.js";
import { post, get } from "../../../http";
import { setTimeout, setInterval } from "timers";
//import { setTimeout, setInterval } from "timers";

export default {
  name: "college",
  data() {
    return {
      isAllowSet: true,
      oldScreenName: "", //没修改前影厅名称
      seatF1: 0, //一层座位数
      seatF2: 0, //二层座位数
      cancelText: "取消",
      okText: "确定",
      statusManagement: {
        openMore: false, //是否开启双层模式
        setData: false, //添加影厅弹窗 显示true隐藏false
        seatLayout: false, //座位布局弹窗 显示true隐藏false
        isInit: 0 //此学校是否已有影厅 0没有影厅（会把一些模块隐藏） 1已有影厅
      },
      floor_list: [
        {
          value: "1",
          label: "一层"
        },
        {
          value: "2",
          label: "二层"
        }
      ],
      floor_now: "1", //目前所在层数
      formTop: {
        movieHallName: "" //创建影厅名称
      },
      ruleValidate: {
        movieHallName: [
          {
            required: true,
            message: "请填写影厅名称",
            trigger: "blur"
          },
          {
            required: true,
            pattern: /^[^\s]*$/g,
            message: "不允许有空格",
            trigger: "blur"
          }
        ]
      },
      //初始化座位数据
      mapSort: {
        setScreenName: "",
        row: 10, //排
        col: 10, //列
        sortRow: "tb", //方向 tb上下  bt下上
        sortCol: "lr" //方向 lr左右  rl右左
      },
      currentHallId: "", //当前影厅 id 即 screen_no
      currentHallName: "", //当前影厅名称
      seatsAmount: 0, //座位总数
      screenInfo: [], //影厅信息
      seatInfo: {}, //座位信息
      configlayer: false, //模态框隐藏显示
      configMsg: "", //模态框提示内容
      loading: false, //loading
      qiehuan: false,
      college_cinema_name: "",
      college_cinema_no: "",
      isChange: 0, //记录是否修改，离开后是否保存 >0 修改过
      goOver: true //可以切换影厅 切换楼层 返回上一页
      //screen_no: ""
    };
  },
  methods: {
    //初始化座位图和座位布局框
    seatInit() {
      this.mapSort.row = 10;
      this.mapSort.col = 10;
      this.mapSort.sortRow = "tb";
      this.mapSort.sortCol = "lr";
      this.statusManagement.openMore = false;
      this.$refs.colHead.innerHTML = this.$refs.rowHead.innerHTML = this.$refs.map.innerHTML =
        "";
    },
    //添加影厅显示弹窗
    addMovieHall() {
      this.statusManagement.setData = true;
    },
    //确定添加影厅
    okMovieName(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$http
            .post("/api/screen/saveScreen", {
              screen_name: this.formTop.movieHallName,
              cinema_id: this.college_cinema_no,
              t: Math.random()
            })
            .then(res => {
              let { code, data, msg } = res.body;

              if (code == 0) {
                this.$refs.sWrap.style.width = 0;
                this.delId = data.id = data.screen_id;
                this.screenInfo.push(data);

                this.currentHallId = data.screen_no;

                this.currentHallName = this.oldScreenName = this.mapSort.setScreenName =
                  data.screen_name;

                this.showSuccess(msg);
                this.seatInit();
                this.seatInfo = {};
                this.formTop.movieHallName = "";
                this.isChange = 0;
                new CreateMap("box", this).seatShow(
                  {
                    graphRow: this.mapSort.row, //排
                    graphCol: this.mapSort.col, //列
                    dir: this.mapSort.sortRow + this.mapSort.sortCol //方向
                  },
                  [], //座位信息 默认为[]
                  0 //0 新建座位  1修改座位
                );
              } else {
                this.showError(msg);
              }
              this.loading = false;
            })
            .catch(err => {});

          this.statusManagement.isInit = 1; //是否已有影厅 0没有  1有
          this.statusManagement.setData = false; //隐藏添加框
        }
      });
    },
    //座位布局弹框显示
    setSeatLayout() {
      this.statusManagement.seatLayout = true;
    },
    //生成座位图
    createMap() {
      if (this.mapSort.row == "" || this.mapSort.col == "") {
        this.showError("排或列不能为空");
        return;
      }

      if (
        !/^[0-9]{1,3}$/.test(this.mapSort.row) ||
        !/^[0-9]{1,3}$/.test(this.mapSort.col)
      ) {
        this.showError("排或列格式不正确");
        return;
      }
      this.screenInfo.forEach(v => {
        if (v.screen_no == this.currentHallId) {
          v.screen_name = this.oldScreenName = this.currentHallName = this.mapSort.setScreenName;
        }
      });
      new CreateMap("box", this).seatShow(
        {
          graphRow: this.mapSort.row, //排
          graphCol: this.mapSort.col, //列
          dir: this.mapSort.sortRow + this.mapSort.sortCol //方向
        },
        [], //座位信息 默认为[]
        0 //0 新建座位  1修改座位
      );
      this.statusManagement.seatLayout = false; //关闭弹框
    },
    //获取影厅座位数据(回显)
    loadHallData(params) {
      this.loading = true;
      this.screenInfo = [];
      this.$http
        .post("/api/screen/getScreenAndSeat", {
          cinema_id: this.college_cinema_no,
          screen_id: params
        })
        .then(res => {
          let { code, data, msg } = res.body;
          if (code == 0) {
            this.statusManagement.isInit = 1; //是否有影厅 0无 1有
            this.screenInfo = data.screens; //影厅信息
            this.currentHallId = data.screens[0].screen_no; //当前影厅screen_no
            this.delId = data.screens[0].id; //当前影厅id
            this.currentHallName = this.oldScreenName = this.mapSort.setScreenName =
              data.screens[0].screen_name; //当前影厅名称

            if (data.seat_info.length != 0) {
              this.planningData(data.seat_info);

              setTimeout(() => {
                new CreateMap("box", this).seatShow(
                  data.screens,
                  this.seatInfo["f" + this.floor_now],
                  1
                );
                this.loading = false;
              }, 2000);
            } else {
              setTimeout(() => {
                this.$refs.colHead.innerHTML = this.$refs.rowHead.innerHTML = this.$refs.map.innerHTML =
                  "";
              }, 0);
              this.loading = false;
            }
          } else if (code == 1) {
            this.loading = false;
            this.statusManagement.isInit = 0;
          } else {
            this.showError(msg);
            this.loading = false;
          }
          this.isChange = 0;
        });
    },
    //重置
    mapReset() {
      this.mapSort.row = 10;
      this.mapSort.col = 10;
      this.mapSort.sortRow = "tb";
      this.mapSort.sortCol = "lr";
      // this.mapSort = {
      //   row: 10, //排
      //   col: 10, //列
      //   sortRow: "tb", //方向 tb上下  bt下上
      //   sortCol: "lr" //方向 lr左右  rl右左
      // };
    },
    //切换影厅提示
    screenTag(screen_id) {
      //提示离开前是否要保存修改座位
      this.cancelText = "取消";
      this.okText = "确定";
      if (this.isChange > 0) {
        this.configlayer = true;
        this.configMsg = `座位图变更未保存，是否确定离开？`;
        this.mdStatus = "tipsave";
        this.screen_id = screen_id;
        return;
      }

      if (this.oldScreenName != this.mapSort.setScreenName) {
        this.configlayer = true;
        this.configMsg = `影厅名变更未保存，是否确定离开？`;
        this.mdStatus = "hallname";
        this.screen_id = screen_id;
        return;
      }
      this.changeScreen(screen_id || this.delId);
    },
    //切换影厅
    changeScreen(screen_id) {
      this.seatInit(); //初始化座位
      this.loading = this.qiehuan = true;
      this.floor_now = "1"; //切换影厅默认显示第一层

      this.$http
        .post("/api/screen/getScreenAndSeat", {
          screen_id,
          cinema_id: this.college_cinema_no
        })
        .then(res => {
          let { code, data, msg } = res.body;
          this.currentHallId = data.screens[0].screen_no;

          this.currentHallName = this.oldScreenName = this.mapSort.setScreenName =
            data.screens[0].screen_name;
          if (code == 0) {
            this.planningData(data.seat_info);
            new CreateMap("box", this).seatShow(
              data.screens,
              this.seatInfo["f1"],
              1
            );
            this.screen_id = this.delId = screen_id;
          }
          this.qiehuan = this.loading = false;
        });
    },
    //切换楼层
    changeFloor(value) {
      if (this.qiehuan) return; //影厅切换时不执行下面代码

      if (this.isChange > 0) {
        this.$Message.error("请先保存当前影厅");

        setTimeout(() => {
          if (value == 1) {
            this.floor_now = "2";
          } else {
            this.floor_now = "1";
          }
        }, 0);
      } else {
        new CreateMap("box", this).seatShow(
          this.screenInfo,
          this.seatInfo["f" + value],
          1
        );
      }
    },
    //删除影厅
    delScreen() {
      this.cancelText = "取消";
      this.okText = "确定";
      this.configlayer = true;
      this.configMsg = `确定删除 ${this.currentHallName} 吗？`;
      this.mdStatus = "del";
      this.delId = this.delId;
      //this.screen_no = this.currentHallId;
    },
    //判断楼层及 1 2层数据分离
    planningData(data) {
      let f1 = [];
      let f2 = [];

      let showSeats = data.filter(v => {
        v = eval(v);
        if (v.floor == 1) {
          f1.push(v);
        } else {
          f2.push(v);
        }
        return v.show != 0;
      });

      this.seatInfo.f1 = f1;

      if (f1.length != 0 && f1[0].is_double == 0) {
        //没二层
        this.seatInfo.f2 = [];
        this.statusManagement.openMore = false;
      } else if (f1.length == 0) {
        this.statusManagement.openMore = false;
      } else {
        this.seatInfo.f2 = f2;
        //说明有两层
        this.statusManagement.openMore = true;
      }
      this.seatsAmount = showSeats.length;
      this.seatF1 = f1.filter(v => v.show != 0).length;
      this.seatF2 = f2.filter(v => v.show != 0).length;
    },
    getMaxColAndRow(arr) {
      let graphRowArr = [];
      let graphColArr = [];
      let seatRowArr = [];
      let seatColArr = [];

      arr.forEach(v => {
        graphRowArr.push(v.graph_row);
        graphColArr.push(v.graph_col);
        seatRowArr.push(v.seat_row);
        seatColArr.push(v.seat_col);
      });

      //提取回显座位图 最大行坐标
      this.graphRow = graphRow = this.Vue.mapSort.row =
        graphRowArr.sort(function(n1, n2) {
          return n2 - n1;
        })[0] *
          1 +
        1;
      //提取回显座位图 最大列坐标
      this.graphCol = graphCol = this.Vue.mapSort.col =
        graphColArr.sort(function(n1, n2) {
          return n2 - n1;
        })[0] *
          1 +
        1;
    },
    limit(el) {
      if (this.mapSort[el] > 100) {
        this.mapSort[el] = 100;
      }
    },
    ok() {
      if (this.mdStatus == "del") {
        this.$http
          .post("/api/screen/deleteScreen", {
            screen_id: this.delId,
            screen_no: this.currentHallId,
            cinema_id: this.college_cinema_no
          })
          .then(res => {
            let { msg, code, data } = res.body;

            if (code == 0) {
              this.$Message.success(msg);
              setTimeout(() => {
                this.$router.go(0);
              }, 1000);
            } else {
              this.$Message.error(msg);
            }
          });
      }
      if (this.mdStatus == "goback") {
        this.$router.push({
          name: "college-cinema-list"
        });
        this.isChange = 0;
      }

      if (this.mdStatus == "tipsave") {
        this.changeScreen(this.screen_id);
        this.isChange = 0;
      }

      if (this.mdStatus == "hallname") {
        this.changeScreen(this.screen_id);
      }
      // if (this.mdStatus == "tipsave") {
      //   this.changeScreen(this.screen_id);
      //   this.isChange = 0;
      // }
    },
    cancel() {},
    //****************************保存座位图
    saveMapSeat() {
      let _this = this;
      this.map = this.$refs.map;
      let seatItem = this.map.children;
      let saveFlag = true;

      if (!this.isClickChange) {
        this.$Message.error("请先保存座位号");
        return;
      }
      if (/\s+/.test(this.mapSort.setScreenName)) {
        this.$Message.error("影厅名称不能有空格");
        return;
      }
      this.seatArr = [];
      let showLen = 0;
      [...seatItem].forEach((v, i) => {
        let seatBlockItem = v.children;
        [...seatBlockItem].forEach((item, j) => {
          let json = {};
          json.graph_row = item.getAttribute("gy") * 1 + 1;
          json.graph_col = item.getAttribute("gx") * 1 + 1;
          json.seat_row = item.getAttribute("sy");
          json.seat_col = item.getAttribute("sx");
          json.seat_status = item.getAttribute("status");
          json.show = !item.getAttribute("disabled") ? 1 : 0;
          if (json.show) {
            showLen++;
          }
          json.floor = this.floor_now;
          json.fixedx = item.getAttribute("fixedx");
          json.fixedy = item.getAttribute("fixedy");
          this.seatArr.push(JSON.stringify(json));
        });
      });

      if (this.seatArr.length == 0) {
        this.$Message.error("请先创建座位");
        return;
      }

      if (showLen == 0) {
        this.$Message.error("座位图不能为空");
        return;
      }

      if (!saveFlag) return;

      if (this.mapSort.setScreenName.replace(/\s+/g, "") == "") {
        this.$Message.error("影厅名称不能为空");
        return;
      }

      saveFlag = false;
      this.$http
        .post("/api/screen/saveScreenSeat", {
          cinema_no: this.college_cinema_no,
          screen_no: this.currentHallId,
          seat_data: this.seatArr,
          floor: this.floor_now,
          is_double: this.statusManagement.openMore ? 1 : 0,
          setScreenName: this.mapSort.setScreenName,
          oldScreenName: this.oldScreenName
        })
        .then(res => {
          let { code, msg, data } = res.body;
          saveFlag = true;
          if (code == 0) {
            this.showSuccess(msg);
            this.seatArr.forEach((v, i) => {
              this.seatArr[i] = JSON.parse(v);
            });
            this.screenInfo.forEach(v => {
              if (v.screen_no == this.currentHallId) {
                v.screen_name = this.oldScreenName = this.mapSort.setScreenName;
              }
            });
            this.planningData(data.seat_info);
          } else {
            this.showError(msg);
            setTimeout(() => {
              this.changeScreen(this.screen_id);
            }, 1500);
          }
          this.isChange = 0;
        });
    },
    showSuccess(msg) {
      this.$Message.success(msg);
    },
    showError(msg) {
      this.$Message.error(msg);
    },
    goBack() {
      this.cancelText = "取消";
      this.okText = "确定";
      if (this.isChange > 0) {
        this.configlayer = true;
        this.configMsg = `座位已修改还未保存，确认离开吗？`;
        this.mdStatus = "goback";
      } else {
        this.$router.push({
          name: "college-cinema-list"
        });
      }
    }
  },
  computed: {},
  mounted() {
    this.hammertime = new Hammer(this.$store.state.mainBody); //初始化触摸插件
    this.getMainBody = this.$store.state.mainBody; //存贮获取的 body 元素
    console.log( this.$route.params.college_cinema_no);
    this.college_cinema_no = this.$route.params.college_cinema_no;
    this.loadHallData(this.$route.query.screen_id);
    if (this.$route.query.view) {
      this.isAllowSet = false;
    } else {
      this.isAllowSet = true;
    }
    new CreateMap("box", this).seatShow();
    this.college_cinema_name = this.$route.params.college_cinema_name;
  }

};
</script>