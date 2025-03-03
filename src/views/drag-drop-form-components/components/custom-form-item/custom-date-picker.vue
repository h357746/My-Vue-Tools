<template>
  <a-date-picker v-bind="props" />
</template>
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  format: String,
  showTime: Boolean,
  disabled: Boolean,
  showToday: Boolean,
})
</script>
<style scoped>
/* ... existing code ... */
</style>