import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFormSettingStore = defineStore('formSetting', () => {
  //表单项配置
  const formCompList = ref([])
  const currentFormItemConfig = ref({})
  const currentFormItemIndex = ref(0)

  function setCurrentFormItemIndex(newIndex) {
    currentFormItemIndex.value = newIndex
  }
  const getCurrentFormItemIndex = computed(() => {
    return currentFormItemIndex.value
  })
  function setFormCompList(newFormItem) {
    if (Array.isArray(newFormItem)) {
      formCompList.value = newFormItem
    } else {
      formCompList.value.push(newFormItem)
    }
  }
  function clear() {
    formCompList.value = []
    currentFormItemConfig.value = {}
    currentFormItemIndex.value = 0
  }
  function setCurrentFormItemConfig(newConfig) {
    currentFormItemConfig.value = { ...newConfig } // 修改这里，确保正确更新 config 对象
  }
  const getConfigData = computed(() => {
    return currentFormItemConfig.value
  })
  const getFormCompList = computed(() => {
    return formCompList.value
  })

  function updateCurrentFormItemConfig(props) {
    formCompList.value[currentFormItemIndex.value].props = props
  }
  function updateCurrengFormItemName(name) {
    formCompList.value[currentFormItemIndex.value].label = name
  }

  //表单配置
  const formConfig = ref({
    layout: 'horizontal',
    labelAlign: 'left',
    labelWidth: 100,
    span:24
  })
  const getFormConfig = computed(() => {
    return formConfig.value
  })
  function setFormConfig(newConfig) {
    formConfig.value = { ...newConfig }
  }

  return {
    getConfigData,
    getFormCompList,
    setCurrentFormItemIndex,
    getCurrentFormItemIndex,
    setCurrentFormItemConfig,
    setFormCompList,
    clear,
    updateCurrentFormItemConfig,
    updateCurrengFormItemName,
    formConfig,
    getFormConfig,
    setFormConfig,
  }
})
