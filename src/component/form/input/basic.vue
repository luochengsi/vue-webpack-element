<template>
  <div style="width: 100%;">
  	<title2 title="基础样式"></title2>
	<el-input v-model="input" placeholder="请输入内容"></el-input>
  </div>
</template>

<script>
import title2 from '../../public/title2.vue'
  export default {
  	components: { title2 },
    data() {
	    return {
	      input: ''
	    }
  	}
  }
</script>