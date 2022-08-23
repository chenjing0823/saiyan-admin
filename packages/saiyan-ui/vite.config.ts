/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// import Unocss from "unocss/vite";
import Unocss from "./config/unocss";

import copy from "rollup-plugin-copy";
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // 添加UnoCSS插件
    Unocss(),

    copy({
      targets: [
        { src: "package.json", dest: "dist" },
        { src: "README.md", dest: "dist" },
      ],
      hook: "writeBundle",
    }),
  ],

  build: {
    rollupOptions: {
      external: ["vue", "vue-router"],
      output: {
        assetFileNames: "[name].[ext]",
        globals: {
          vue: "Vue",
        },
      },
    },
    cssCodeSplit: true,
    minify: "terser", // boolean | 'terser' | 'esbuild'
    sourcemap: true, // 输出单独 source文件
    reportCompressedSize: true, // 生成压缩大小报告
    lib: {
      entry: "./src/entry.ts",
      name: "SmartyUI",
      fileName: "smarty-ui",
      // 导出模块格式
      formats: ["es", "umd", "iife"],
    },
  },

  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: "happy-dom",
    // 支持tsx组件，很关键
    transformMode: {
      web: [/.[tj]sx$/],
    },
  },
});