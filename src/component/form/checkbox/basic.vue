<template>
  <div style="width: 100%;">
	<!-- `checked` 为 true 或 false -->
	<h2>基础样式</h2>
  	<el-checkbox v-model="checked" checked>备选项</el-checkbox>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checked: true
      };
    }
  }
</script>