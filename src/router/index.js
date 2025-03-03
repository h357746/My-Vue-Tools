import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/index.vue'),
      meta: {
        title: '首页',
      },
      children: [
        {
          path: '/virtual-list',
          name: 'virtual-list',
          component: () => import('../views/virtual-list.vue'),
          meta: {
            title: '虚拟列表',
          },
        },
        {
          path: '/drag',
          name: 'drag',
          component: () => import('../views/drag/index.vue'),
          meta: {
            title: '拖拽和缩放功能',
          },
        },
        {
          path: '/drag-drop-form-components',
          name: 'drag-drop-form-components',
          component: () => import('../views/drag-drop-form-components/index.vue'),
          meta: {
            title: '拖拽表单组件',
          },
        },
      ],
    },
  ],
})

export default router
