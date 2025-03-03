<template>
  <a-slider v-bind="props" v-model:value="value" />
</template>
<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  min: Number,
  max: Number,
  range: Boolean,
  disabled: Boolean,
})
const value = ref(2)
</script>
<style scoped>
/* ... existing code ... */
</style>
