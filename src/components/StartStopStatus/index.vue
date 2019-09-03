<template >
  <div id="ss">
    <p v-if="nowStatus * 1 === toEval(start)[0]" :class="{'_start' : nowStatus * 1 === toEval(start)[0]}">{{toEval(start)[1]}}</p>
    <p v-if="nowStatus * 1 === toEval(stop)[0]" :class="{'_stop' : nowStatus * 1 === toEval(stop)[0]}">{{toEval(stop)[1]}}</p>
  </div>
</template>
<script>
export default {
  props:{
    nowStatus:{
      default:0
    },
    start:{
      default:[1,'启用']
    },
    stop:{
      default:[0,'停用']
    }
  },
  data() {
    return { 
    }
  },
  created() {

  },
  methods: {
    toEval(v){
      return eval(v);
    }
  }
}
</script>

<style lang="scss" scoped>
#ss{
  ._start{ color: #67c23a; }
  ._stop{ color: rgb(255, 73, 73); }
}
</style>
