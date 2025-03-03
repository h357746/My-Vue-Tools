<template>
  <div class="glass">
    <div class="comp-list-wrap"><formCopmList /></div>
    <div class="form-drag-wrap"><formDragWrap /></div>
    <div class="comp-setting-wrap"><formCompSetting /></div>
  </div>
</template>
<script setup>
import formCopmList from './components/form-copm-list.vue'
import formDragWrap from './components/form-drag-wrap.vue'
import formCompSetting from './components/form-comp-setting.vue'
</script>
<style lang="less" scoped>
.glass {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 12px;
  .comp-list-wrap {
    width: 300px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 12px;
    background: #fff;
    color: #000;
    border-radius: 12px;
  }
  .form-drag-wrap {
    flex: 1;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
  }
  .comp-setting-wrap {
    width: 400px;
    height: 100%;
    background: #fff;
    border-radius: 12px;
    padding: 8px;
  }
}
</style>
