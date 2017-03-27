<template>
  <div style="width: 100%;">
    <h2>禁用样式</h2>
  	<el-radio disabled v-model="radio1" label="禁用">备选项</el-radio>
    <el-radio disabled v-model="radio1" label="选中且禁用">备选项</el-radio>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio1: '选中且禁用'
      };
    }
  }
</script>