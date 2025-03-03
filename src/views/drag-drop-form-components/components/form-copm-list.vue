<script setup>
import { compList } from './component-mapping.js'

const handleDrag = (e, comp) => {
  e.dataTransfer?.setData('text/plain', comp.componentName)
}
</script>

<template>
  <div>
    <h1 class="title">表单组件列表</h1>
    <div
      v-for="(comp, index) in compList"
      :key="index"
      class="comp-item"
      draggable="true"
      @dragstart="handleDrag($event, comp)"
      data-type="text"
    >
      {{ comp.label }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.comp-item {
  margin-bottom: 10px;
  cursor: grab;
  text-align: center;
  line-height: 32px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
