<template>
  <a-modal v-model:open="open" title="表单预览" :footer="null" :width="800">
    <a-form :layout="formConfig.layout" :labelAlign="formConfig.labelAlign" :label-col="labelCol">
      <a-row :gutter="24">
        <a-col :span="formConfig.span" v-for="element in formCompList" :key="element.id">
          <a-form-item :label="element.label" :required="element.props.required">
            <component :is="element.formItemComp" v-bind="element.props"></component>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useFormSettingStore } from '@/stores/formSetting.js'
const open = ref(false)
const store = useFormSettingStore()
const showModal = () => {
  open.value = true
}
const formCompList = computed(() => store.getFormCompList)
const formConfig = computed(() => store.getFormConfig)
const labelCol = computed(() => {
  return {
    style: {
      width: `${formConfig.value.labelWidth}px`,
    },
  }
})

defineExpose({
  showModal,
})
</script>
