import axios from "axios";
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "./assets/_theme.css";
import "normalize.css";

export function renderApp(
  el = "#app",
  initialProps: { accountId: number; appName: string }
) {
  axios.interceptors.request.use(
    (config) => {
      // Если это POST-запрос, добавляем нужные параметры
      if (config.method === "post") {
        // Объединяем существующие параметры с новыми
        config.data = {
          ...config.data,
          accountId: initialProps.accountId,
          appName: initialProps.appName,
        };
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Инициализация приложения
  const app = createApp(App);
  app.use(store);
  app.mount(el);
}

// Инициализация с пропсами (Это только для тестов)
renderApp("#app", { accountId: 0, appName: "Test" });
