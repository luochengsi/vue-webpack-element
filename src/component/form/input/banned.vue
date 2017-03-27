<template>
  <div style="width: 100%;">
  	<h2>禁用样式</h2>
    <el-input
      placeholder="请输入内容"
      v-model="input1"
      :disabled="true">
    </el-input>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input1: ''
      }
    }
  }
</script>