import { Module } from "vuex";
import {
  NotificationState,
  CascaderOption,
  ChandgeResponsible,
  Button,
  Employee,
  Bot,
} from "@/components/notification-component/notificationTypes";
import { RootState } from "../storeTypes";
import axios from "axios";

export function generateNewId(
  notificationItems: Array<{ id: string }>
): string {
  // Извлечь все текущие ID и преобразовать их в числа
  const currentIds = notificationItems.map((item) => parseInt(item.id, 10));
  // Найти максимальный ID
  const maxId = Math.max(...currentIds, 0);
  // Генерировать новый ID, увеличивая максимальный на 1
  const newId = maxId + 1;
  // Преобразовать новый ID обратно в строку
  return newId.toString();
}

const notifications: Module<NotificationState, RootState> = {
  namespaced: true,
  state: {
    notificationItem: [],
    tempNotificationName: "",
    initializedComponents: {},
    cascaderOptions1: [],
  },

  getters: {
    getAllButtons:
      (state) =>
      (notificationId: string): Button[] => {
        const notification = state.notificationItem.find(
          (item) => item.id === notificationId
        );
        return notification ? notification.data.buttons : [];
      },

    getInputValue: (state) => (notificationId: string, buttonId: string) => {
      const notification = state.notificationItem.find(
        (item) => item.id === notificationId
      );
      if (!notification) return null;
      const button = notification.data.buttons.find(
        (button) => button.id === buttonId
      );
      return button ? button.inputValue : null;
    },

    getLinkValue: (state) => (notificationId: string, buttonId: string) => {
      const notification = state.notificationItem.find(
        (item) => item.id === notificationId
      );
      if (!notification) return null;
      const button = notification.data.buttons.find(
        (button) => button.id === buttonId
      );
      return button ? button.linkValue : null;
    },

    getCascaderValue: (state) => (notificationId: string, buttonId: string) => {
      const notification = state.notificationItem.find(
        (item) => item.id === notificationId
      );
      if (!notification) return null;
      const button = notification.data.buttons.find(
        (button) => button.id === buttonId
      );
      return button ? button.cascaderValue : null;
    },

    getCascaderOptions: (state) => state.cascaderOptions1,

    getChangeResponsible:
      (state) => (notificationId: string, buttonId: string) => {
        const notification = state.notificationItem.find(
          (item) => item.id === notificationId
        );
        if (!notification) return null;
        const button = notification.data.buttons.find(
          (button) => button.id === buttonId
        );
        return button ? button.change_responsible : null;
      },

    getDeleteMessage: (state) => (notificationId: string, buttonId: string) => {
      const notification = state.notificationItem.find(
        (item) => item.id === notificationId
      );
      if (!notification) return null;
      const button = notification.data.buttons.find(
        (button) => button.id === buttonId
      );
      return button ? button.delete_message : null;
    },

    getSelectedEmployees:
      (state) =>
      (notificationId: string): Employee[] => {
        const notification = state.notificationItem.find(
          (item) => item.id === notificationId
        );
        return notification ? notification.data.selectedEmployees : [];
      },

    getNotification: (state) => (notificationId: string) => {
      return state.notificationItem.find((item) => item.id === notificationId);
    },

    getSelectedBot:
      (state) =>
      (notificationId: string): Bot | null => {
        const notification = state.notificationItem.find(
          (item) => item.id === notificationId
        );
        return notification ? notification.data.selectedBot : null;
      },
  },

  mutations: {
    addInitialNotifications: (state, notifications) => {
      if (notifications && notifications.length > 0) {
        state.notificationItem = notifications;
      }
    },

    setComponentInitialized: (state, { notificationId, value }) => {
      state.initializedComponents[notificationId] = value;
    },

    addNewNotification: (state, newNotification) => {
      state.notificationItem.push(newNotification);
    },

    updateInputValue: (
      state,
      payload: { notificationId: string; id: string; value: string }
    ) => {
      const notification = state.notificationItem.find(
        (item) => item.id === payload.notificationId
      );
      if (!notification) return;
      const button = notification.data.buttons.find(
        (button) => button.id === payload.id
      );
      if (button) button.inputValue = payload.value;
    },

    updateLinkValue: (
      state,
      payload: { notificationId: string; id: string; value: string }
    ) => {
      const notification = state.notificationItem.find(
        (item) => item.id === payload.notificationId
      );
      if (!notification) return;
      const button = notification.data.buttons.find(
        (button) => button.id === payload.id
      );
      if (button) button.linkValue = payload.value;
    },

    updateCascaderValue: (
      state,
      payload: {
        notificationId: string;
        id: string;
        value: CascaderOption | null;
      }
    ) => {
      const notification = state.notificationItem.find(
        (item) => item.id === payload.notificationId
      );
      if (!notification) return;
      const button = notification.data.buttons.find(
        (button) => button.id === payload.id
      );
      if (button) button.cascaderValue = payload.value;
    },

    setCascaderOptions: (state, options: CascaderOption[]) => {
      state.cascaderOptions1 = options;
    },

    addButton: (state, notificationId: string) => {
      const notification = state.notificationItem.find(
        (item) => item.id === notificationId
      );
      if (!notification) {
        console.error(`Оповещение с id ${notificationId} не найдено`);
        return;
      }

      if (!notification.data || !notification.data.buttons) {
        console.error(
          `Данные или кнопки отсутствуют в оповещении с id ${notificationId}`
        );
        return;
      }

      // Проверяем, не превышено ли максимальное количество кнопок
      if (notification.data.buttons.length >= 5) {
        console.error("Невозможно добавить более 5 кнопок");
        return;
      }

      const maxId = Math.max(
        ...notification.data.buttons.map((button) => parseInt(button.id, 10)),
        0
      );
      const newId = (maxId + 1).toString();

      // Проверка, чтобы id не превышало 5
      if (parseInt(newId, 10) > 5) {
        console.error("ID не может быть больше 5");
        return;
      }

      notification.data.buttons.push({
        id: newId,
        inputValue: "",
        cascaderValue: null,
        linkValue: "",
        delete_message: false,
        change_responsible: {
          deal: false,
          task: false,
          company: false,
        },
      });
    },

    removeButton: (state, payload: { notificationId: string; id: string }) => {
      const notification = state.notificationItem.find(
        (item) => item.id === payload.notificationId
      );
      if (!notification) return;

      notification.data.buttons = notification.data.buttons.filter(
        (button) => button.id !== payload.id
      );
    },

    updateChangeResponsibleField(
      state,
      payload: {
        notificationId: string;
        id: string;
        field: string;
        value: boolean;
      }
    ) {
      const notification = state.notificationItem.find(
        (item) => item.id === payload.notificationId
      );
      if (!notification) return;

      const button = notification.data.buttons.find(
        (button) => button.id === payload.id
      );
      if (button && button.change_responsible) {
        const validFields: Array<keyof ChandgeResponsible> = [
          "deal",
          "task",
          "company",
        ];
        if (validFields.includes(payload.field as keyof ChandgeResponsible)) {
          button.change_responsible[payload.field as keyof ChandgeResponsible] =
            payload.value;
        }
      }
    },

    updateDeleteMessage: (
      state,
      payload: { notificationId: string; id: string; value: boolean }
    ) => {
      const notification = state.notificationItem.find(
        (item) => item.id === payload.notificationId
      );
      if (!notification) return;

      const button = notification.data.buttons.find(
        (button) => button.id === payload.id
      );
      if (button) button.delete_message = payload.value;
    },

    setSelectedEmployees(
      state,
      payload: { notificationId: string; employees: Employee[] }
    ) {
      const notification = state.notificationItem.find(
        (item) => item.id === payload.notificationId
      );
      if (notification && notification.data) {
        notification.data.selectedEmployees = payload.employees;
      }
    },

    updateNotificationName: (
      state,
      payload: { notificationId: string; name: string }
    ) => {
      const notification = state.notificationItem.find(
        (item) => item.id === payload.notificationId
      );
      if (notification) {
        notification.name = payload.name;
      }
    },

    setTempNotificationName: (state, name: string) => {
      state.tempNotificationName = name;
    },

    updateNotificationText: (
      state,
      payload: { notificationId: string; text: string }
    ) => {
      const notification = state.notificationItem.find(
        (item) => item.id === payload.notificationId
      );
      if (notification) {
        notification.data.notificationText = payload.text;
      }
    },

    updateSelectedBot: (
      state,
      payload: { notificationId: string; bot: Bot }
    ) => {
      const notification = state.notificationItem.find(
        (item) => item.id === payload.notificationId
      );
      if (notification) {
        notification.data.selectedBot = payload.bot;
      }
    },

    copyNotification: (state, notificationId: string) => {
      const originalNotification = state.notificationItem.find(
        (item) => item.id === notificationId
      );
      if (originalNotification) {
        const copiedNotification = JSON.parse(
          JSON.stringify(originalNotification)
        );
        const newId = generateNewId(state.notificationItem); // Используем функцию для генерации нового ID
        copiedNotification.id = newId;
        copiedNotification.name = `${originalNotification.name} (Копия)`;
        state.notificationItem.push(copiedNotification);
      }
    },

    setNotificationSaved: (
      state,
      payload: { id: string; isSaved: boolean }
    ) => {
      const notification = state.notificationItem.find(
        (item) => item.id === payload.id
      );
      if (notification) {
        notification.isSaved = payload.isSaved;
      }
    },

    removeNotification: (state, notificationId: string) => {
      state.notificationItem = state.notificationItem.filter(
        (item) => item.id !== notificationId
      );
    },
  },

  actions: {
    fetchInitialNotifications({ commit }) {
      axios
        .get<Notification[]>("http://localhost:3000/get-initial-notifications") // Заменить на нужный адрес!!!
        .then((response) => {
          commit("addInitialNotifications", response.data);
        })
        .catch((error) => {
          console.error("Ошибка при получении оповещений:", error);
        });
    },

    fetchCascaderOptions({ commit }) {
      axios
        .get<CascaderOption[]>("http://localhost:3000/get-cascader1-data") // Заменить на нужный адрес!!!
        .then((response) => {
          const updatedData = response.data.map((item) => ({
            ...item,
            children: item.children
              ? item.children.map((child) => ({
                  ...child,
                  disabled: child.value === "disabled",
                }))
              : undefined,
          }));

          commit("setCascaderOptions", updatedData);
        });
    },

    handleTabsEdit: (
      { commit },
      {
        notificationId,
        paneName,
        action,
      }: {
        notificationId: string;
        paneName: string | undefined;
        action: "add" | "remove";
      }
    ) => {
      if (action === "remove" && paneName) {
        commit("removeButton", { notificationId, id: paneName });
      }
      if (action === "add") {
        commit("addButton", notificationId);
      }
    },

    async saveNotificationItem({ commit, state }, notificationId: string) {
      try {
        // Обновляем имя перед сохранением
        commit("updateNotificationName", {
          notificationId,
          name: state.tempNotificationName,
        });

        commit("setNotificationSaved", {
          id: notificationId,
          isSaved: true,
        });

        const updatedNotification = state.notificationItem.find(
          (item) => item.id === notificationId
        );

        if (!updatedNotification) {
          console.error("Уведомление с данным ID не найдено");
          return;
        }

        const response = await axios.post(
          "http://localhost:3000/save-notification",
          {
            notificationItem: updatedNotification,
          }
        );

        if (response.status === 200) {
          console.log("Успешно сохранено!");
          commit("setComponentInitialized", {
            notificationId,
            value: false,
          });
        } else {
          console.log("Ошибка при сохранении:", response.status);
        }
      } catch (error) {
        console.error("Ошибка при сохранении:", error);
      }
    },

    async copyAndSaveNotification({ commit, state }, notificationId: string) {
      commit("copyNotification", notificationId);
      const copiedNotification =
        state.notificationItem[state.notificationItem.length - 1];
      if (copiedNotification) {
        try {
          const response = await axios.post(
            "http://localhost:3000/save-notification",
            {
              notificationItem: copiedNotification,
            }
          );
          if (response.status === 200) {
            console.log("Успешно сохранено!");
          } else {
            console.log("Ошибка при сохранении:", response.status);
          }
        } catch (error) {
          console.error("Ошибка при сохранении:", error);
        }
      }
    },

    async removeNotificationItem({ commit }, notificationId: string) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/delete-notification/${notificationId}`
        );

        if (response.status === 200) {
          commit("removeNotification", notificationId);
          console.log("Успешно удалено!");
        } else {
          console.log("Ошибка при удалении:", response.status);
        }
      } catch (error) {
        console.error("Ошибка при удалении:", error);
      }
    },
  },
};

export default notifications;
