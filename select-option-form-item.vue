<template>
  <div v-for="(item, index) in options" :key="index">
    <a-row :gutter="4" style="margin-bottom: 8px">
      <a-col :span="11">
        <a-input v-model:value="item.label" @change="handleChange(index)">
          <template #addonBefore> label </template>
        </a-input>
      </a-col>
      <a-col :span="11">
        <a-input v-model:value="item.value" @change="handleChange(index)">
          <template #addonBefore> value </template>
        </a-input>
      </a-col>
      <a-col :span="2">
        <MinusCircleOutlined
          v-if="options.length > 1"
          class="dynamic-delete-button"
          @click="removeItem(index)"
        />
      </a-col>
    </a-row>
  </div>

  <a-button type="dashed" @click="addItem" style="width: 100%">
    <PlusOutlined />
  </a-button>
</template>

<script setup>
import { ref } from 'vue'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons-vue'

const options = ref([
  {
    value: '',
    label: '',
  },
])

const emit = defineEmits(['update:modelValue', 'change'])

const removeItem = (index) => {
  options.value.splice(index, 1)
}

const addItem = () => {
  options.value.push({
    value: '',
    label: '',
  })
}

const handleChange = (index) => {
  let flag = false
  options.value.forEach((item, idx) => {
    if (item.label && item.value) {
      flag = true
    }
  })
  if (flag) {
    console.log('🚀 ~ handleChange ~ flag:', flag)
    emit('update:modelValue', options.value)
    emit('change', options.value) // 触发 change 事件
  }
}
</script>

<style scoped>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>