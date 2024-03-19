import { createApp } from "vue";
import App from "./App.vue";
import { createHead } from "@unhead/vue";
import "./assets/tailwind.css";
import router from "./router";
const head = createHead();

createApp(App).use(router).use(head).mount("#app");
