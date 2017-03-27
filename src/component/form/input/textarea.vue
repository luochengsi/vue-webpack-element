<template>
  <div style="width: 100%;">
  	<title2 title="文本域"></title2>
  	<el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="textarea">
    </el-input>
    <div style="margin: 20px 0;"></div>
    <el-input
      type="textarea"
      autosize
      placeholder="请输入内容"
      v-model="textarea2">
    </el-input>
    <div style="margin: 20px 0;"></div>
    <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="请输入内容"
      v-model="textarea3">
    </el-input>
  </div>
</template>

<script>
import title2 from '../../public/title2.vue'
  export default {
  	components: { title2 },
    data() {
      return {
        textarea: '',
        textarea2: '',
        textarea3: ''
      }
    }
  }
</script>