import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Unocss from "../packages/saiyan-ui/config/unocss";

import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // 添加UnoCSS插件
    Unocss(),]
});