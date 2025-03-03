<template>
  <div>
    <a-tree
      v-model:expandedKeys="expandedKeys"
      v-model:selectedKeys="selectedKeys"
      :tree-data="treeData"
      show-icon
      draggable
      @drop="onDrop"
    >
      <template #title="{ title, key, dataRef }">
        <a-input
          v-if="editableNode === key"
          v-model:value="editingTitle"
          @blur="onTitleBlur(key)"
          @pressEnter="onTitleBlur(key)"
          ref="inputRef"
          :draggable="false"
        />
        <span v-else @click="editTitle(title, key)">{{ title }}</span>
        <a-tooltip v-if="editableNode !== key">
          <template #title> 增加节点</template>
          <FileAddOutlined @click="addChild(dataRef)" style="margin-left: 8px; color: blue" />
        </a-tooltip>
        <!-- 删除按钮 -->
        <a-tooltip v-if="editableNode !== key">
          <template #title> 删除节点</template>
          <MinusCircleOutlined @click="removeNode(key)" style="margin-left: 8px; color: red" />
        </a-tooltip>
      </template>
    </a-tree>
    <a-button type="dashed" @click="addItem" style="width: 100%">
      <PlusOutlined /> 增加节点
    </a-button>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { PlusOutlined, MinusCircleOutlined, FileAddOutlined } from '@ant-design/icons-vue'
import { Form } from 'ant-design-vue'

const props = defineProps({
  value: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:value', 'change'])

const treeData = ref(props.value)
const formItemContext = Form.useInjectFormItemContext()
const expandedKeys = ref([])
const selectedKeys = ref([])
const editableNode = ref(null)
const editingTitle = ref('')
const inputRef = ref(null)

const triggerChange = (changedValue) => {
  emit('update:value', changedValue)
  formItemContext.onFieldChange()
  emit('change')
}

const addItem = () => {
  const newKey = `node-${Date.now()}`
  const newTreeData = [
    ...treeData.value,
    { title: 'New Node', key: newKey, value: newKey, children: [] },
  ]
  treeData.value = newTreeData
  triggerChange(newTreeData)
}

const editTitle = (title, key) => {
  editableNode.value = key
  editingTitle.value = title
  nextTick(() => {
    inputRef.value.focus()
  })
}
const loop = (data, key, callback) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].key === key) {
      return callback(data, i, data[i])
    }
    if (data[i].children && data[i].children.length) {
      loop(data[i].children, key, callback)
    }
  }
}
const onTitleBlur = (key) => {
  const dataTemp = [...treeData.value]

  loop(dataTemp, key, (data, index) => {
    data[index].title = editingTitle.value
  })
  treeData.value = dataTemp
  triggerChange(dataTemp)
  editableNode.value = null
}

const onDrop = (info) => {
  const dropKey = info.node.key
  const dragKey = info.dragNode.key
  const dropPos = info.node.pos.split('-')
  const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

  const data = [...treeData.value]
  const loop = (data, key, callback) => {
    data.forEach((item, index, arr) => {
      if (item.key === key) {
        return callback(item, index, arr)
      }
      if (item.children) {
        return loop(item.children, key, callback)
      }
    })
  }

  let dragObj
  loop(data, dragKey, (item, index, arr) => {
    arr.splice(index, 1)
    dragObj = item
  })

  if (!info.dropToGap) {
    loop(data, dropKey, (item) => {
      item.children = item.children || []
      item.children.unshift(dragObj)
    })
  } else if (
    (info.node.children || []).length > 0 && // Has children
    info.node.expanded && // Is expanded
    dropPosition === 1 // On the bottom gap
  ) {
    loop(data, dropKey, (item) => {
      item.children = item.children || []
      item.children.push(dragObj)
    })
  } else {
    let ar
    let i
    loop(data, dropKey, (item, index, arr) => {
      ar = arr
      i = index
    })
    if (dropPosition === -1) {
      ar.splice(i, 0, dragObj)
    } else {
      ar.splice(i + 1, 0, dragObj)
    }
  }

  treeData.value = data
  triggerChange(data)
}

const addChild = (dataRef) => {
  const newKey = `node-${Date.now()}`
  const newChild = { title: 'New Child', key: newKey, value: newKey, children: [] }
  if (!dataRef.children) {
    dataRef.children = []
  }
  dataRef.children.push(newChild)
  triggerChange(treeData.value)
}

// 删除节点逻辑
const removeNode = (key) => {
  const dataTemp = [...treeData.value]

  loop(dataTemp, key, (data, index) => {
    if (Array.isArray(data)) {
      data.splice(index, 1)
    }
  })
  treeData.value = dataTemp
  triggerChange(dataTemp)
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
