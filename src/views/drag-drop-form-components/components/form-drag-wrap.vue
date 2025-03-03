<template>
  <div class="drag-wrap" @dragover.prevent @drop="handleDrop">
    <div class="preview">
      <a-space>
        <a-tooltip>
          <template #title>PC端预览</template>
          <img
            @click="handlePreview('pc')"
            src="@/assets/images/pc-view.png"
            alt=""
            class="preview-icon"
          />
        </a-tooltip>

        <a-tooltip>
          <template #title>手机端预览</template>
          <img
            @click="handlePreview('mobile')"
            src="@/assets/images/mobile-view.png"
            alt=""
            class="preview-icon"
          />
        </a-tooltip>
      </a-space>
    </div>
    <a-form :layout="formConfig.layout" :labelAlign="formConfig.labelAlign" :label-col="labelCol">
      <a-row :gutter="24">
        <transition-group name="drag">
          <a-col
            :span="formConfig.span"
            v-for="(element, index) in formCompList"
            :key="element.id"
            class="draggable-item"
            draggable="true"
            @dragstart="dragStart(index)"
            @dragover.prevent
            @drop="drop(index)"
            :data-index="index"
          >
            <a-form-item
              :label="element.label"
              @click="setConfig(index, element)"
              :required="element.props.required"
              :data-index="index"
            >
              <component
                :is="element.formItemComp"
                v-bind="element.props"
                :data-index="index"
              ></component>
            </a-form-item>
            <CopyTwoTone class="copy-icon icon" @click="copyFormItem(index)" />
            <DeleteTwoTone class="delete-icon icon" @click="deleteFormItem(index)" />
          </a-col>
        </transition-group>
      </a-row>
    </a-form>
    <formView ref="formViewRef" />
  </div>
</template>
<script setup>
import { ref, markRaw, computed } from 'vue'
import { compList } from './component-mapping.js'
import { useFormSettingStore } from '@/stores/formSetting.js'
import { DeleteTwoTone, CopyTwoTone } from '@ant-design/icons-vue'
import formView from './form-view.vue'
const store = useFormSettingStore()
const formViewRef = ref(null)
// 确保 formCompList 是响应式的
const formCompList = computed(() => store.getFormCompList)
const formConfig = computed(() => store.getFormConfig)
const labelCol = computed(() => {
  return {
    style: {
      width: `${formConfig.value.labelWidth}px`,
    },
  }
})

let dragIndex = -1

// 修正拼写错误，方法名改为 findParentElementDataSet
function findParentElementDataSet(el) {
  // 检查元素是否存在
  if (!el) return -1
  // 检查当前元素的 dataset 属性中是否有 index 属性
  if (el && el.dataset && el.dataset.index !== undefined) {
    return el.dataset.index
  } else if (el && el.parentNode) {
    // 递归检查父节点
    return findParentElementDataSet(el.parentNode)
  }
  // 如果没有找到，返回 -1
  return -1
}

function handleDrop(e) {
  console.log('🚀 ~ handleDrop ~ e:', e)
  e.preventDefault()
  const compName = e.dataTransfer?.getData('text/plain')
  const result = compList.find((item) => item.componentName === compName)
  if (result) {
    const newFormItem = {
      id: formCompList.value.length + 1,
      ...result,
      formItemComp: markRaw(result.component),
    }
    // 查找插入位置
    let insertIndex = findParentElementDataSet(e.target)
    // 如果没有找到插入位置，则插入到最后
    if (insertIndex === -1) {
      insertIndex = formCompList.value.length
    }
    // 创建新的列表并插入新元素
    const newList = [...formCompList.value]
    newList.splice(insertIndex, 0, newFormItem)
    // 更新 store 中的 formCompList
    store.setFormCompList(newList)
  } else {
    console.warn(`Component with name ${compName} not found in compList`)
  }
}

function setConfig(index, config) {
  store.setCurrentFormItemIndex(index)
  store.setCurrentFormItemConfig(config)
}

function dragStart(index) {
  dragIndex = index
}

function drop(targetIndex) {
  if (dragIndex !== -1 && dragIndex !== targetIndex) {
    const newList = [...formCompList.value]
    const draggedItem = newList.splice(dragIndex, 1)[0]
    newList.splice(targetIndex, 0, draggedItem)
    dragIndex = -1
    store.setFormCompList(newList)
  }
}
function deleteFormItem(index) {
  const newList = [...formCompList.value]
  newList.splice(index, 1)
  store.setFormCompList(newList)
}
function copyFormItem(index) {
  const newList = [...formCompList.value]
  const draggedItem = newList[index]
  newList.splice(formCompList.value.length, 0, draggedItem)
  store.setFormCompList(newList)
}
function handlePreview(type) {
  if (type === 'pc') {
    formViewRef.value.showModal(type)
  }
}
</script>
<style lang="less" scoped>
.drag-wrap {
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow: auto;
  position: relative;
}
.preview {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 8px;
  .preview-icon {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
}

.draggable-item {
  width: 100%;
  margin-bottom: 12px;
  // border: 1px dashed #857d7d;
  border-radius: 4px;
  padding: 10px;
  transition: all 0.3s ease;
  position: relative;
  box-sizing: border-box;

  .icon {
    position: absolute;
    cursor: pointer;
    display: none;
    font-size: 24px;
  }
  .copy-icon {
    right: 32px;
    bottom: 0;
  }
  .delete-icon {
    right: 0;
    bottom: 0;
  }
}

.draggable-item:hover {
  outline: 1px dashed blue;
  .delete-icon {
    display: block;
  }
  .copy-icon {
    display: block;
  }
}

.ant-form-item-label {
  label {
    font-weight: bold;
    color: #333;
  }
}

:deep(.ant-form-item) {
  margin-bottom: 0;
}

/* 过渡效果 */
.drag-move {
  transition: transform 0.3s ease;
}

.drag-enter-active,
.drag-leave-active {
  transition: all 0.3s ease;
}

.drag-enter-from,
.drag-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
