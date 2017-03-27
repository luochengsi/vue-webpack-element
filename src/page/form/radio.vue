<template>
  <div style="width: 100%;">
	<basicRadio></basicRadio>
	<bannedRadio></bannedRadio>
	<groupRadio></groupRadio>
	<styleRadio></styleRadio>
  </div>
</template>

<script>
import basicRadio from '../../component/form/radio/basic.vue'
import bannedRadio from '../../component/form/radio/banned.vue'
import groupRadio from '../../component/form/radio/group.vue'
import styleRadio from '../../component/form/radio/style.vue'
  export default {
    components: { basicRadio, bannedRadio, groupRadio, styleRadio }
  }
</script>