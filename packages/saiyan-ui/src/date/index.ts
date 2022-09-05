import Date from "./Date";
import { App } from "vue";

// 导出Date组件
export { Date };

// 导出Vue插件
export default {
  install(app: App) {
    app.component(Date.name, Date);
  },
};
