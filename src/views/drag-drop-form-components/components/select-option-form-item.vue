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
import { ref, toRaw } from 'vue'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons-vue'
import { Form } from 'ant-design-vue'

const props = defineProps({
  value: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:value', 'change'])

const options = ref(props.value)
const formItemContext = Form.useInjectFormItemContext()

const triggerChange = (changedValue) => {
  emit('update:value', changedValue)
  formItemContext.onFieldChange()
}

// watch(
//   () => props.value,
//   (newValue) => {
//     if (Array.isArray(newValue)) {
//       options.value = [...newValue]
//     } else {
//       console.warn('Expected value to be an array, but got:', newValue)
//       options.value = []
//     }
//   },
//   { deep: true },
// )

const removeItem = (index) => {
  const newOptions = options.value.filter((_, idx) => idx !== index)
  options.value = newOptions
  handleChange()
}

const addItem = () => {
  const newOptions = [...options.value, { value: '', label: '' }]
  options.value = newOptions
}

const handleChange = () => {
  let flag = false
  options.value.forEach((item) => {
    if (item.label && item.value) {
      flag = true
    }
  })
  if (flag) {
    triggerChange(options.value)
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
