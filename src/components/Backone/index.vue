<template>
  <el-button @click="goBack" size="medium">返回</el-button>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    goBack(){
      this.$router.go(-1);
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
