<template>
  <div class="input-box-shade" v-if="isBoxShow">
      <div class="input-box">
        <div class="input-title-bar">{{title}}<i class="input-box-close el-message-box__close el-icon-close" @click="closeBox"></i></div>
        <div class="input-wrap">
          <slot></slot>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
     
    } 
  },
  props:{
    isBoxShow:{
      type:Boolean,
      default:false
    },
    title:{
      type:String,
      default:'提示'
    }
  },
  methods: {
    closeBox(){
     this.$emit('hideBox',false);
    }
  },
  mounted(){
   
  }
}
</script>
<style lang="scss" scoped>
.input-box-shade{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 888;
    background: rgba(0,0,0,0.4);
    .input-box{
      background: #fff;
      width: 500px;
      min-height: 100px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      border-radius: 6px;
      overflow: hidden;
    }
    .input-title-bar{
      height: 40px;
      line-height: 40px;
      background: #409eff;
      padding: 0 10px 0 15px;
      font-size: 16px;
      color: #fff;
      border-radius: 6px 6px 0 0;
    }
    .input-box-close{
      float: right;
      color: #fff;
      margin: 12px 0 0 0;
      cursor: pointer;
    }
    .input-wrap{
      padding: 10px;
    }
  }
</style>
