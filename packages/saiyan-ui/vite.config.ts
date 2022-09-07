/// <reference types="vitest" />
import { defineConfig, Plugin_2 } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// import Unocss from "unocss/vite";
import Unocss from "./config/unocss";
import { UserConfig } from "vitest";

// import copy from "rollup-plugin-copy";
// https://vitejs.dev/config/

export const config = {
  plugins: [
    vue() as Plugin_2,
    vueJsx() as Plugin_2,
    // 添加UnoCSS插件
    Unocss() as Plugin_2[],
  ],

  build: {
    rollupOptions: {
      external: ["vue"],
      output: {
        assetFileNames: "[name].[ext]",
        exports: "named",
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
      name: "SaiyanUI",
      fileName: "saiyan-ui",
      // 导出模块格式
      formats: ["esm", "umd", "iife"],
    },
    outDir: "./dist",
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
    coverage: {
      provider: "istanbul", // or 'c8',
      reporter: ["text", "json", "html"],
    },
  },
};

export default defineConfig(config as UserConfig);
