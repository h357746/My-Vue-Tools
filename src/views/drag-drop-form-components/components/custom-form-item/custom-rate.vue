<template>
  <a-rate v-bind="props" v-model:value="value" />
</template>
<script setup>
import { defineProps, ref } from 'vue'
const value = ref(2)
const props = defineProps({
  count: Number,
  allowHalf: Boolean,
  disabled: Boolean,
  tooltips: Array,
})
</script>
<style scoped>
/* ... existing code ... */
</style>
