<template>
  <div style="width: 100%;">
	<basicRadio></basicRadio>
	<bannedRadio></bannedRadio>
	<groupRadio></groupRadio>
	<indeterminateRadio></indeterminateRadio>
  </div>
</template>

<script>
import basicRadio from '../../component/form/checkbox/basic.vue'
import bannedRadio from '../../component/form/checkbox/banned.vue'
import groupRadio from '../../component/form/checkbox/group.vue'
import indeterminateRadio from '../../component/form/checkbox/indeterminate.vue'
  export default {
    components: { basicRadio, bannedRadio, groupRadio, indeterminateRadio }
  }
</script>