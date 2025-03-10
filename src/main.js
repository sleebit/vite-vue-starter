import { MotionPlugin } from "@vueuse/motion";
import { createApp } from "vue";

import "./assets/index.css";
import router from "./router/index.js";
import store from "./store/index.js";
import App from "./App.vue";

const app = createApp(App);

app.use(store).use(router).use(MotionPlugin);

app.mount("#app");
