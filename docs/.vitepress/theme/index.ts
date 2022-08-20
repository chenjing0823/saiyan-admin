import DefaultTheme from "vitepress/theme";
import SmartyUI from "../../../src/entry";

import ButtonDemo from "../../components/ButtonDemo.vue";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(SmartyUI);
    app.component(ButtonDemo.name, ButtonDemo);
  },
};
