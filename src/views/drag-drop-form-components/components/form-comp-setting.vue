<script setup>
import { useFormSettingStore } from '@/stores/formSetting.js'
import { watch, ref, onMounted, reactive } from 'vue'
import { Empty } from 'ant-design-vue'
import selectOptionFormItem from './select-option-form-item.vue'
import treeOptionFormItem from './tree-option-form-item.vue'
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
const store = useFormSettingStore()
const formCompList = ref([])
const formSetate = ref({})
const formConfig = ref({})
const labelCol = {
  span: 6,
}
const wrapperCol = {
  span: 18,
}
const key = ref(Math.random())
watch(
  () => store.getConfigData,
  (newValue) => {
    formCompList.value = newValue.componentProps
    formSetate.value = { label: newValue.label, ...newValue.props }
    key.value = Math.random()
  },
  { deep: true },
)

function handleChange() {
  store.updateCurrentFormItemConfig(formSetate.value)
}

function handleNameChange() {
  store.updateCurrengFormItemName(formSetate.value.label)
}
function handleConfigChange() {
  store.setFormConfig(formConfig.value)
}
const radioStyle = reactive({
  display: 'flex',
  height: '30px',
  lineHeight: '30px',
})
onMounted(() => {
  formConfig.value = store.getFormConfig
})
</script>

<template>
  <a-tabs>
    <a-tab-pane key="1" tab="组件设置">
      <a-empty :image="simpleImage" v-if="!formCompList.length" description="请选择组件" />
      <a-form
        autocomplete="off"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :labelWrap="true"
        :key="key"
      >
        <a-form-item label="表单项名称" v-if="formCompList.length">
          <a-input v-model:value="formSetate.label" @change="handleNameChange" />
        </a-form-item>
        <a-form-item :label="item.title" v-for="(item, index) in formCompList" :key="index">
          <a-input
            v-model:value="formSetate[item.key]"
            v-if="item.type === 'string'"
            @change="handleChange"
          />
          <a-input-number
            v-model:value="formSetate[item.key]"
            v-else-if="item.type === 'number'"
            @change="handleChange"
            :min="0"
            :max="100"
            :step="1"
            style="width: 100%"
          />
          <a-switch
            v-model:checked="formSetate[item.key]"
            v-else-if="item.type === 'boolean'"
            @change="handleChange"
          />
          <a-select
            v-model:value="formSetate[item.key]"
            v-else-if="item.type === 'array'"
            :options="item.options"
            @change="handleChange"
          />
          <selectOptionFormItem
            v-model:value="formSetate[item.key]"
            v-else-if="item.type === 'select'"
            @change="handleChange"
          />
          <treeOptionFormItem
            v-model:value="formSetate[item.key]"
            v-else-if="item.type === 'tree'"
            @change="handleChange"
          />
        </a-form-item> </a-form
    ></a-tab-pane>
    <a-tab-pane key="2" tab="表单设置">
      <a-form autocomplete="off" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="表单布局">
          <a-radio-group v-model:value="formConfig.layout" @change="handleConfigChange">
            <a-radio :style="radioStyle" value="horizontal">水平排列</a-radio>
            <a-radio :style="radioStyle" value="vertical">垂直排列</a-radio>
            <a-radio :style="radioStyle" value="inline">行内排列</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="表单列数">
          <a-radio-group v-model:value="formConfig.span" @change="handleConfigChange">
            <a-radio :value="24">一列</a-radio>
            <a-radio :value="12">两列</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="标签对齐方式">
          <a-radio-group v-model:value="formConfig.labelAlign" @change="handleConfigChange">
            <a-radio value="left">左对齐</a-radio>
            <a-radio value="right">右对齐</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="标签宽度">
          <a-input-number
            v-model:value="formConfig.labelWidth"
            @change="handleConfigChange"
            :min="0"
            :max="300"
            :step="1"
            style="width: 100%"
          />
        </a-form-item>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>

<style lang="less" scoped>
.title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}
</style>
