/// <reference types="vitest" />

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJSX from "@vitejs/plugin-vue-jsx";
import Unocss from "./config/unocss";

const rollupOptions = {
  external: ["vue", "vue-router"],
  output: {
    globals: {
      vue: "Vue",
    },
  },
};

export default defineConfig({
  plugins: [vue(), vueJSX(), Unocss()],

  // 添加库模块配置
  build: {
    rollupOptions,
    minify: "esbuild", // boolean | 'terser' | "esbuild"
    sourcemap: true, // 单独输出source文件
    cssCodeSplit: true,
    lib: {
      entry: "./src/entry.ts",
      name: "SmartyUI",
      fileName: "smarty-ui",
      // 导出模块
      formats: ["es", "umd", "iife"],
    },
  },

  test: {
    // 开启像jest一样的全局api模式
    globals: false,
    // 设置提供仿真DOm
    environment: "happy-dom",

    // 支持tsx组件，很关键
    transformMode: {
      web: [/.[tj]sx$/],
    },
  },
});
