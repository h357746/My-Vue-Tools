<template>
  <a-input-number v-bind="props" style="width: 100%" v-model:value="value" />
</template>
<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  min: Number,
  max: Number,
  step: Number,
  disabled: Boolean,
})
const value = ref(0)
</script>
<style scoped>
/* ... existing code ... */
</style>
