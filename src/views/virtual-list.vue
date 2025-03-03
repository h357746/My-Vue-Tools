<template>
  <div class="glass">
    <virtualList :list="list" :itemHeight="50" />
  </div>
</template>

<script setup>
import virtualList from '@/views/drag/components/virtualList.vue'

const list = Array.from({ length: 10000 }, (v, i) => i)
</script>

<style lang="less" scoped></style>
