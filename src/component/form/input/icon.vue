<template>
  <div style="width: 100%;">
  	<title2 title="带图标"></title2>
  	<el-input
      placeholder="请选择日期"
      icon="search"
      v-model="input2"
      :on-icon-click="handleIconClick">
    </el-input>
  </div>
</template>

<script>
import title2 from '../../public/title2.vue'
  export default {
  	components: { title2 },
    data() {
      return {
        input2: ''
      }
    },
    methods: {
      handleIconClick(ev) {
        console.log(ev);
      }
    }
  }
</script>