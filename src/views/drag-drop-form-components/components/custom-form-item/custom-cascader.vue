<template>
  <a-cascader
    v-bind="props"
    :field-names="{ label: 'title', value: 'key', children: 'children' }"
  />
</template>
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  options: Array,
  showSearch: Boolean,
  allowClear: Boolean,
  changeOnSelect: Boolean,
})
</script>
<style scoped>
/* ... existing code ... */
</style>
