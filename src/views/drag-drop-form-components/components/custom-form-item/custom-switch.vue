<template>
  <a-switch v-bind="props" v-model:checked="checked" />
</template>
<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  disabled: Boolean,
  loading: Boolean,
  checkedChildren: String,
  unCheckedChildren: String,
})
const checked = ref(false)
</script>
<style scoped>
/* ... existing code ... */
</style>
