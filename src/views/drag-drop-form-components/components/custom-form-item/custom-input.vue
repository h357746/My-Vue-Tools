<template>
  <a-input v-bind="props" />
</template>
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  placeholder: String,
  disabled: Boolean,
  readonly: Boolean,
  allowClear: Boolean,
})
</script>
<style scoped>
/* ... existing code ... */
</style>