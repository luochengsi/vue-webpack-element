<template>
  <div style="width: 100%;">
	<basicBtn></basicBtn>
	<bannedBtn></bannedBtn>	
	<colorBtn></colorBtn>
	<iconBtn></iconBtn>
	<groupBtn></groupBtn>
	<loadingBtn></loadingBtn>
	<sizeBtn></sizeBtn>
  </div>
</template>

<script>
import basicBtn from '../component/btn/basic.vue'
import bannedBtn from '../component/btn/banned.vue'
import colorBtn from '../component/btn/color.vue'
import iconBtn from '../component/btn/icon.vue'
import groupBtn from '../component/btn/group.vue'
import loadingBtn from '../component/btn/loading.vue'
import sizeBtn from '../component/btn/size.vue'
  export default {
    components: { basicBtn, bannedBtn, colorBtn, iconBtn, groupBtn, loadingBtn, sizeBtn }
  }
</script>