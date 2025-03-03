<template>
  <a-checkbox-group v-model:value="value" v-bind="props" :options="options" />
</template>
<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  disabled: Boolean,
  indeterminate: Boolean,
  options: Array,
})
const value = ref([])
</script>
<style scoped>
/* ... existing code ... */
</style>
