<template>
  <a-tree-select v-bind="props" />
</template>
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  treeData: Array,
  showSearch: Boolean,
  allowClear: Boolean,
  multiple: Boolean,
})
</script>
<style scoped>
/* ... existing code ... */
</style>