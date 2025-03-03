<template>
  <div class="virtual-list-wrap" ref="containerRef" @scroll="handleScroll">
    <div class="placeholder-list" :style="`height:${totalHeight}px`"></div>
    <div class="main-list" :style="{ transform: getTransform }">
      <div
        class="list-item"
        v-for="item in renderList"
        :key="item"
        :style="{
          height: itemHeight + 'px',
          lineHeight: itemHeight + 'px',
          backgroundColor: `rgba(0,0,0,${item / 100})`,
        }"
      >
        {{ item + 1 }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue'
const { list, itemHeight } = defineProps({
  list: Array,
  itemHeight: Number,
})
const containerRef = ref(null)
const offset = ref(0)
const startIndex = ref(0)
const endIndex = ref(0)
const showCount = computed(() => {
  return Math.ceil(containerRef.value.clientHeight / itemHeight)
})
const totalHeight = computed(() => {
  return list.length * itemHeight
})
const renderList = computed(() => list.slice(startIndex.value, endIndex.value + 1))
const getTransform = computed(() => `translate3d(0,${offset.value}px,0)`)

function handleScroll() {
  const scrollTop = containerRef.value.scrollTop
  console.log('🚀 ~ handleScroll ~ scrollTop:', scrollTop)
  startIndex.value = Math.floor(scrollTop / itemHeight)
  console.log('🚀 ~ handleScroll ~  startIndex.value:', startIndex.value)
  endIndex.value = Math.min(startIndex.value + showCount.value, list.length)
  offset.value = scrollTop - (scrollTop % itemHeight)
  console.log('🚀 ~ handleScroll ~  offset.value:', offset.value)
}
</script>

<style lang="less" scoped>
.virtual-list-wrap {
  height: 100%;
  width: 100%;
  overflow: auto;
  position: relative;
  .placeholder-list {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
  }
  .main-list {
    .list-item {
      padding: 10px;
      color: #fff;
      box-sizing: border-box;
      border-bottom: 1px solid #e1e1e1;
    }
  }
}
</style>
