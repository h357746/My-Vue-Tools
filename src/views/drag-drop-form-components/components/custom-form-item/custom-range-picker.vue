<template>
  <a-range-picker v-bind="props" />
</template>
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  format: String,
  showTime: [Boolean, Object],
  disabled: Boolean,
})
</script>
<style scoped>
/* ... existing code ... */
</style>