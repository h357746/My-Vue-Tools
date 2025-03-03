import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      resolvers: [AntDesignVueResolver()],
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'less', // 按需导入样式
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
    server: {
    host: '0.0.0.0',
  },
})
