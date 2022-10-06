import { createApp } from "vue";
import { createPinia } from 'pinia';
import App from "./App.vue";
import stores from "./stores";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";

const appInstance = createApp(App);
appInstance.use(createPinia());
appInstance.use(stores);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
