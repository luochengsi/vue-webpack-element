<template>
  <div style="width: 100%;">
  	<h2>基础样式</h2>
	<el-button :plain="true" @click="open">打开消息提示</el-button>
  </div>
</template>

<script>
  export default {
    methods: {
      open() {
        this.$message('这是一条消息提示');
      }
    }
  }
</script>