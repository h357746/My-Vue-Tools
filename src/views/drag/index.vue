<template>
  <div class="glass" ref="dragWrapRef">
    <div class="drag-item" ref="dragItemRef" @mousedown="startDrag" :style="style">
      <div
        v-for="(type, index) in dragType"
        :key="index"
        class="drag-btn"
        :class="type"
        @mousedown.stop="startMove($event, type)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
const dragType = ['lt', 'lc', 'lb', 'ct', 'cb', 'rt', 'rc', 'rb']

const dragWrapRef = ref(null)
const dragItemRef = ref(null)
const dragWrapRectRef = ref(null)
const resizeType = ref('')
const initialPositionX = ref(0) // 初始X位置
const initialPositionY = ref(0) // 初始Y位置
const initialMouseX = ref(0) // 初始鼠标X位置
const initialMouseY = ref(0) // 初始鼠标Y位置
const intiialWidth = ref(300) // 初始宽度
const intiialHeight = ref(360) // 初始高度
let minHeight = 360 // 最小高度
let minWidth = 300 // 最小宽度
let maxWidth = 500 // 最大宽度
let maxHeight = 600 // 最大高度
let dragBoxX = 0, // 拖动框X位置
  dragBoxY = 0 // 拖动框Y位置
let dragBoxWidth = 0, // 拖动框宽度
  dragBoxHeight = 0 // 拖动框高度
const style = computed(() => {
  return {
    top: initialPositionY.value + 'px',
    left: initialPositionX.value + 'px',
    width: intiialWidth.value + 'px',
    height: intiialHeight.value + 'px',
  }
})

/**
 * 处理拖动事件
 * @param {MouseEvent} e - 鼠标事件对象
 */
function handleDrag(e) {
  // 计算鼠标移动的偏移量
  let deltaX = e.clientX - initialMouseX.value
  let deltaY = e.clientY - initialMouseY.value

  // 计算新的位置
  let newX = initialPositionX.value + deltaX
  let newY = initialPositionY.value + deltaY

  // 检查新的位置是否在 dragWrapRef 的边界内
  if (isMouseInsideElement(newX, newY)) {
    // 更新 dragItemRef 的位置
    initialPositionX.value = newX
    initialPositionY.value = newY

    // 更新初始鼠标位置
    initialMouseX.value = e.clientX
    initialMouseY.value = e.clientY
  }
}

/**
 * 开始拖动事件
 * @param {MouseEvent} e - 鼠标事件对象
 */
function startDrag(e) {
  initialMouseX.value = e.clientX
  initialMouseY.value = e.clientY
  // 添加鼠标移动和鼠标松开事件监听
  document.addEventListener('mousemove', handleDrag)
  document.addEventListener('mouseup', stopDrag)
}

/**
 * 处理调整大小事件
 * @param {MouseEvent} e - 鼠标事件对象
 */
function handleResize(e) {
  // 计算鼠标移动的偏移量
  let deltaX = e.clientX - initialMouseX.value
  let deltaY = e.clientY - initialMouseY.value
  // 初始化新的宽度和高度
  let newWidth = dragBoxWidth
  let newHeight = dragBoxHeight
  // 根据调整大小的类型进行处理
  switch (resizeType.value) {
    case 'lt': // 左上角
      newWidth -= deltaX
      if (newWidth < maxWidth && newWidth > minWidth) {
        intiialWidth.value = newWidth
        initialPositionX.value = dragBoxX + deltaX
      }

      newHeight -= deltaY
      if (newHeight < maxHeight && newHeight > minHeight) {
        intiialHeight.value = newHeight
        initialPositionY.value = dragBoxY + deltaY
      }

      break
    case 'lc': // 左中
      newWidth -= deltaX
      if (newWidth < maxWidth && newWidth > minWidth) {
        intiialWidth.value = newWidth
        initialPositionX.value = dragBoxX + deltaX
      }
      break
    case 'lb': // 左下
      newWidth -= deltaX
      if (newWidth < maxWidth && newWidth > minWidth) {
        intiialWidth.value = newWidth
        initialPositionX.value = dragBoxX + deltaX
      }

      newHeight += deltaY
      if (newHeight < maxHeight && newHeight > minHeight) {
        intiialHeight.value = newHeight
      }

      break
    case 'ct': // 中上
      newHeight -= deltaY
      if (newHeight < maxHeight && newHeight > minHeight) {
        intiialHeight.value = newHeight
        initialPositionY.value = dragBoxY + deltaY
      }
      break
    case 'cb': // 中下
      newHeight += deltaY
      if (newHeight < maxHeight && newHeight > minHeight) {
        intiialHeight.value = newHeight
      }

      break
    case 'rt': // 右上
      newWidth += deltaX
      if (newWidth < maxWidth && newWidth > minWidth) {
        intiialWidth.value = newWidth
      }

      newHeight -= deltaY
      if (newHeight < maxHeight && newHeight > minHeight) {
        intiialHeight.value = newHeight
        initialPositionY.value = dragBoxY + deltaY
      }

      break
    case 'rc': // 右中
      newWidth += deltaX
      if (newWidth < maxWidth && newWidth > minWidth) {
        intiialWidth.value = newWidth
      }
      break
    case 'rb': // 右下
      newWidth += deltaX
      if (newWidth < maxWidth && newWidth > minWidth) {
        intiialWidth.value = newWidth
      }

      newHeight += deltaY
      if (newHeight < maxHeight && newHeight > minHeight) {
        intiialHeight.value = newHeight
      }
      break
  }
}

/**
 * 开始调整大小事件
 * @param {MouseEvent} e - 鼠标事件对象
 * @param {string} type - 调整大小的类型
 */
function startMove(e, type) {
  initialMouseX.value = e.clientX
  initialMouseY.value = e.clientY
  resizeType.value = type
  dragBoxX = initialPositionX.value
  dragBoxY = initialPositionY.value
  dragBoxWidth = intiialWidth.value
  dragBoxHeight = intiialHeight.value
  // 添加鼠标移动和鼠标松开事件监听
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopDrag)
}

/**
 * 停止拖动或调整大小事件
 */
function stopDrag() {
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopDrag)
}

/**
 * 检查鼠标是否在元素内部
 * @param {number} newX - 新的X坐标
 * @param {number} newY - 新的Y坐标
 * @returns {boolean} - 鼠标是否在元素内部
 */
function isMouseInsideElement(newX, newY) {
  return (
    newX >= 0 &&
    newX + intiialWidth.value <= dragWrapRectRef.value.width &&
    newY >= 0 &&
    newY + intiialHeight.value <= dragWrapRectRef.value.height
  )
}

/**
 * 组件挂载后初始化
 */
onMounted(() => {
  intiialWidth.value = dragItemRef.value.clientWidth
  intiialHeight.value = dragItemRef.value.clientHeight
  initialPositionX.value = dragItemRef.value.offsetLeft
  initialPositionY.value = dragItemRef.value.offsetTop
  dragWrapRectRef.value = dragWrapRef.value.getBoundingClientRect()
  maxWidth = dragWrapRectRef.value.width
  maxHeight = dragWrapRectRef.value.height
})
onUnmounted(() => {
  stopDrag()
})
</script>
<style lang="less" scoped>
.drag-item {
  width: 300px;
  height: 360px;
  position: absolute;
  background: rgba(224, 164, 164, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  cursor: grab;
}

.drag-btn {
  width: 10px;
  height: 10px;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  cursor: move;
}

.lt {
  top: 0;
  left: 0;
}
.lc {
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
.lb {
  bottom: 0;
  left: 0;
}
.ct {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.cb {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.rt {
  top: 0;
  right: 0;
}
.rc {
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
.rb {
  bottom: 0;
  right: 0;
}
</style>
