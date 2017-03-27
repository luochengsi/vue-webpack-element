<template>
  <div style="width: 100%;">
  	<h2>基础样式</h2>
	<el-radio class="radio" v-model="radio" label="1">备选项</el-radio>
  	<el-radio class="radio" v-model="radio" label="2">备选项</el-radio>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio: '2'
      };
    }
  }
</script>