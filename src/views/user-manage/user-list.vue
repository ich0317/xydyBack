<template>
  <div id="user">
    <el-row>
      <el-col :span="24">
        <div class="pan-box">
          <div class="pan-name">查询条件</div>
          <div class="pan-form">
            <el-form :inline="true" label-width="80px" class="demo-form-inline">
              <el-form-item label="手机号">
                <el-input placeholder="手机号" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" />查询
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="content-box">
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="phone_num" label="手机号" width="200" />
        <el-table-column prop="reg_date" label="注册日期" />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  filters: {},
  data() {
    return {
      list: [
        {
          phone_num: '15201664353',
          reg_date: '2019-02-10'
        }
      ],
      listLoading: true,
      searchName: null
    }
  },
  created() {},
  methods: {}
}
</script>
<style lang="scss">
</style>
