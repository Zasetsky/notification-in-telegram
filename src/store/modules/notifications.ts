import { Module } from "vuex";
import {
  NotificationState,
  CascaderOption,
  ChandgeResponsible,
  Button,
  Employee,
} from "@/components/notification-component/notificationTypes";
import { RootState } from "../storeTypes";
import axios from "axios";

const notifications: Module<NotificationState, RootState> = {
  namespaced: true,
  state: {
    notificationItem: [
      {
        id: "1",
        name: "",
        data: {
          employees: [],
          selectedEmployees: [],
          buttons: [
            {
              id: "1",
              inputValue: "",
              cascaderValue: null,
              linkValue: "",
              delete_message: false,
              change_responsible: {
                deal: false,
                task: false,
                company: false,
              },
            },
          ],
        },
      },
    ],
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

    getEmployees:
      (state) =>
      (notificationId: string): Employee[] => {
        const notification = state.notificationItem.find(
          (item) => item.id === notificationId
        );
        return notification ? notification.data.employees : [];
      },

    getSelectedEmployees:
      (state) =>
      (notificationId: string): Employee[] => {
        const notification = state.notificationItem.find(
          (item) => item.id === notificationId
        );
        return notification ? notification.data.selectedEmployees : [];
      },
  },

  mutations: {
    addInitialNotifications: (state, notifications) => {
      if (notifications && notifications.length > 0) {
        state.notificationItem = notifications;
      }
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
        console.error(`Notification with id ${notificationId} not found`);
        return;
      }

      if (!notification.data || !notification.data.buttons) {
        console.error(
          `Data or buttons missing in notification with id ${notificationId}`
        );
        return;
      }

      const maxId = Math.max(
        ...notification.data.buttons.map((button) => parseInt(button.id, 10)),
        0
      );
      const newId = (maxId + 1).toString();
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

    setEmployees(
      state,
      payload: { notificationId: string; employees: Employee[] }
    ) {
      const notification = state.notificationItem.find(
        (item) => item.id === payload.notificationId
      );
      if (notification && notification.data) {
        notification.data.employees = payload.employees;
      }
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
  },

  actions: {
    fetchInitialNotifications({ commit }) {
      axios
        .get("http://localhost:3000/get-initial-notifications") // Заменить на нужный адрес!!!
        .then((response) => {
          commit("addInitialNotifications", response.data);
        })
        .catch((error) => {
          console.error("Ошибка при получении кнопок:", error);
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

    async fetchEmployees({ commit }, notificationId: string) {
      try {
        const response = await axios.get<Employee[]>(
          "http://localhost:3000/get-employees"
        );

        commit("setEmployees", {
          notificationId,
          employees: response.data,
        });

        console.log("Сервер вернул:", response.data);
      } catch (error) {
        console.error("Ошибка при получении данных о сотрудниках:", error);
      }
    },
  },
};

export default notifications;