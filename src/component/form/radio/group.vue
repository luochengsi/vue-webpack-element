<template>
  <div style="width: 100%;">
  	<h2>单选组</h2>
  	<el-radio-group v-model="radio2" @change="handleChange">
      <el-radio :label="3">备选项</el-radio>
      <el-radio :label="6">备选项</el-radio>
      <el-radio :label="9">备选项</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        radio2: 3
      };
    },
    methods: {
      handleChange(val) {
        alert(val)
      }
    }
  }
</script>