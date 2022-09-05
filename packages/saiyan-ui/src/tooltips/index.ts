import Tooltips from "./Tooltips.vue";
import { App } from "vue";

// 导出Button组件
export { Tooltips };

// 导出Vue插件
export default {
  install(app: App) {
    app.component(Tooltips.name, Tooltips);
  },
};
