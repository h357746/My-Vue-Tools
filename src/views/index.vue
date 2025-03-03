<template>
  <div class="page-bg">
    <nav class="navbar">
      <ul class="nav-list">
        <li v-for="route in routes" :key="route.name" class="nav-item">
          <router-link :to="route.path" class="nav-link">{{ route.meta.title }}</router-link>
        </li>
      </ul>
    </nav>
    <RouterView />
  </div>
</template>

<script setup>
import { router } from '../router/index.js'

// 更新 routes 的获取方式，确保能够正确获取到所有带有 meta.title 的子路由
const routes = router
  .getRoutes()
  .flatMap((route) => route.children.filter((child) => child.meta && child.meta.title))
</script>

<style lang="less" scoped>
.navbar {
  background-color: #333;
  padding: 10px;
}

.nav-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.nav-item {
  margin-right: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
