import { createApp } from "vue";
import App from "./app.vue";
import SaiyanUI from 'saiyan-ui/src/entry';
// import SaiyanUI from 'saiyan-ui/dist/saiyan-ui.esm.js';
// import 'saiyan-ui/dist/entry.css'
// import 'element-plus/dist/index.css'

const app = createApp(App);
app.use(SaiyanUI)
app.mount("#app");