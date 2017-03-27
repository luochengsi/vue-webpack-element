<template>
  <div style="width: 100%;">
  	<title2 title="不同尺寸"></title2>
  	<div class="demo-input-size">
      <el-input
        size="large"
        placeholder="请输入内容"
        v-model="input6">
      </el-input>
      <div style="margin: 20px 0;"></div>
      <el-input
        placeholder="请输入内容"
        v-model="input7">
      </el-input>
      <div style="margin: 20px 0;"></div>
      <el-input
        size="small"
        placeholder="请输入内容"
        v-model="input8">
      </el-input>
      <div style="margin: 20px 0;"></div>
      <el-input
        size="mini"
        placeholder="请输入内容"
        v-model="input9">
      </el-input>
    </div>
  </div>
</template>

<script>
import title2 from '../../public/title2.vue'
  export default {
  	components: { title2 },
    data() {
      return {
        input6: '',
        input7: '',
        input8: '',
        input9: ''
      }
    }
  }
</script>