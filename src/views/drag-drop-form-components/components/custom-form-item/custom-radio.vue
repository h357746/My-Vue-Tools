<template>
  <a-radio-group v-model:value="value" v-bind="props" :options="options" />
</template>
<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  checked: Boolean,
  disabled: Boolean,
  options: Array,
})
const value = ref(null)
</script>
<style scoped>
/* ... existing code ... */
</style>
