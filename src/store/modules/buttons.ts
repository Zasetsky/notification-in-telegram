import { Module } from "vuex";
import {
  ButtonsState,
  CascaderOption,
  Button,
} from "@/components/notification-component/steps/buttonTypes";
import { RootState } from "../storeTypes";
import axios from "axios";

const buttons: Module<ButtonsState, RootState> = {
  namespaced: true,
  state: {
    buttons: [
      {
        id: "1",
        title: "Кнопка 1",
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
    cascaderOptions: [],
  },

  getters: {
    getAllButtons: (state): Button[] => state.buttons,

    getInputValue: (state) => (id: string) => {
      const button = state.buttons.find((button) => button.id === id);
      return button ? button.inputValue : null;
    },

    getLinkValue: (state) => (id: string) => {
      const button = state.buttons.find((button) => button.id === id);
      return button ? button.linkValue : null;
    },

    getCascaderValue: (state) => (id: string) => {
      const button = state.buttons.find((button) => button.id === id);
      return button?.cascaderValue;
    },

    getCascaderOptions: (state) => state.cascaderOptions,

    getChangeResponsible: (state) => (id: string) => {
      const button = state.buttons.find((button) => button.id === id);
      return button ? button.change_responsible : null;
    },

    getDeleteMessage: (state) => (id: string) => {
      const button = state.buttons.find((button) => button.id === id);
      return button ? button.delete_message : null;
    },
  },

  mutations: {
    updateInputValue: (state, payload: { id: string; value: string }) => {
      const button = state.buttons.find((button) => button.id === payload.id);
      if (button) button.inputValue = payload.value;
    },

    updateLinkValue: (state, payload: { id: string; value: string }) => {
      const button = state.buttons.find((button) => button.id === payload.id);
      if (button) button.linkValue = payload.value;
    },

    updateCascaderValue: (
      state,
      { id, value }: { id: string; value: CascaderOption | null }
    ) => {
      const button = state.buttons.find((button) => button.id === id);
      if (button) button.cascaderValue = value;
    },

    setCascaderOptions: (state, options: CascaderOption[]) =>
      (state.cascaderOptions = options),

    addButton: (state) => {
      const newTabIndex = state.buttons.length + 1;
      const newId = newTabIndex.toString();
      state.buttons.push({
        id: newId,
        title: `Кнопка ${newTabIndex}`,
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

    addInitialButton: (state, button) => {
      if (button && button.length > 0) {
        // Если данные с сервера пришли и они не пусты, перезаписываем массив
        state.buttons = button;
      }
    },

    removeButton: (state, targetId: string) => {
      state.buttons = state.buttons.filter((button) => button.id !== targetId);
    },

    updateChangeResponsibleField(
      state,
      payload: { id: string; field: string; value: boolean }
    ) {
      console.log(state.buttons[0].change_responsible);
      const button = state.buttons.find((button) => button.id === payload.id);
      if (button && button.change_responsible) {
        button.change_responsible = {
          ...button.change_responsible,
          [payload.field]: payload.value,
        };
      }
    },

    updateDeleteMessage: (state, payload: { id: string; value: boolean }) => {
      const button = state.buttons.find((button) => button.id === payload.id);
      if (button) button.delete_message = payload.value;
    },
  },

  actions: {
    fetchInitialButton({ commit }) {
      axios
        .get("http://localhost:3000/get-initial-button") // Заменить на нужный адрес!!!
        .then((response) => {
          commit("addInitialButton", response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Ошибка при получении кнопок:", error);
        });
    },

    fetchCascaderOptions({ commit }) {
      axios
        .get<CascaderOption[]>("http://localhost:3000/get-cascader-data") // Заменить на нужный адрес!!!
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

    saveAllStatesExceptOptions({ state }) {
      console.log(state.buttons);

      axios
        .post("http://localhost:3000/save-buttons", state.buttons) // Сменить на нужный сервер!!!
        .then((response) => {
          // Обработка успешного сохранения
        })
        .catch((error) => {
          console.error("Ошибка при сохранении настроек:", error);
        });
    },

    handleTabsEdit: (
      { commit },
      {
        paneName,
        action,
      }: { paneName: string | undefined; action: "add" | "remove" }
    ) => {
      if (action === "remove" && paneName) {
        commit("removeButton", paneName);
      }
      if (action === "add") {
        commit("addButton");
      }
    },
  },
};

export default buttons;
