import { createApp } from "vue";
import App from "./App.vue";
import { initializeStore } from "./store/index";
import "./assets/_theme.css";
import "normalize.css";
import { GlobalPropsState } from "./store/modules/globalPropsTypes";

export function renderApp(el = "#app", initialProps: GlobalPropsState) {
  const store = initializeStore(initialProps);
  const app = createApp(App);
  app.use(store);
  app.mount(el);
}

// Инициализация с пропсами (Это только для тестов)
renderApp("#app", { accountId: 0, appName: "Test" });
