<template>
  <div style="width: 100%;">
	<basicInput></basicInput>
	<bannedInput></bannedInput>
	<iconInput></iconInput>
	<textAreaInput></textAreaInput>
	<groupInput></groupInput>
	<sizeInput></sizeInput>
	<autocomplete></autocomplete>
  </div>
</template>

<script>
import basicInput from '../../component/form/input/basic.vue'
import bannedInput from '../../component/form/input/banned.vue'
import iconInput from '../../component/form/input/icon.vue'
import textAreaInput from '../../component/form/input/textarea.vue'
import groupInput from '../../component/form/input/group.vue'
import sizeInput from '../../component/form/input/size.vue'
import autocomplete from '../../component/form/input/autocomplete.vue'
  export default {
    components: { basicInput, bannedInput, iconInput, textAreaInput, groupInput, sizeInput, autocomplete }
  }
</script>