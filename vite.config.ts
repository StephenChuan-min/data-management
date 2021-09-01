import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy'; // 低版本浏览器兼容
import importerPlugin from 'vite-plugin-importer';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
      views: path.resolve(__dirname, 'src/views'),
      router: path.resolve(__dirname, 'src/router'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // antd主题修改
          'primary-color': '#2F7EEC',
          'text-color': '#20242e',
          'border-radius-base': '2px',
          'tabs-horizontal-padding': '14px 16px',
        },
        javascriptEnabled: true, // 使用 antd 的 less 样式 需要开启
      },
    },
  },
  plugins: [
    vue(),
    importerPlugin({
      libraryName: 'ant-design-vue',
      libraryDirectory: 'es',
      style: true, // less
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  build: {
    // 去除console
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
