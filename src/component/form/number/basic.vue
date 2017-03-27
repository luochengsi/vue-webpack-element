<template>
  <div style="width: 100%;">
  	<title2 title="基础样式"></title2>
    <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
    <title2 title="禁用样式"></title2>
    <el-input-number v-model="num2" :disabled="true"></el-input-number>
    <title2 title="步数"></title2>
    <el-input-number v-model="num3" :step="2"></el-input-number>
    <title2 title="尺寸"></title2>
    <el-input-number size="large" v-model="num4"></el-input-number>
    <el-input-number v-model="num5"></el-input-number>
    <el-input-number size="small" v-model="num6"></el-input-number>
  </div>
</template>

<script>
import title2 from '../../public/title2.vue'
  export default {
  	components: { title2 },
    data() {
      return {
        num1: 1,
        num2: 1,
        num3: 5,
        num4: 1,
        num5: 1,
        num6: 1
      };
    },
    methods: {
      handleChange(value) {
        console.log(value);
      }
    }
  }
</script>