<template>
  <a-select v-model:value="value" :options="options" v-bind="props"></a-select>
</template>
<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  placeholder: String,
  mode: String,
  allowClear: Boolean,
  showSearch: Boolean,
  options: Array,
})

const value = ref()
</script>
<style scoped>
/* ... existing code ... */
</style>
