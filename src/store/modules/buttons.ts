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
        id: 0,
        inputValue: "",
        cascaderValue1: null,
        cascaderValue2: null,
        linkValue: "",
      },
    ],
    cascaderOptions1: [],
    cascaderOptions2: [],
  },

  getters: {
    getAllButtons: (state): Button[] => state.buttons,

    getInputValue: (state) => (id: number) => {
      const button = state.buttons.find((button) => button.id === id);
      return button ? button.inputValue : null;
    },

    getLinkValue: (state) => (id: number) => {
      const button = state.buttons.find((button) => button.id === id);
      return button ? button.linkValue : null;
    },

    getCascaderValue: (state) => (id: number, key: string) => {
      const button = state.buttons.find((button) => button.id === id);
      return button
        ? key === "cascader1"
          ? button.cascaderValue1
          : button.cascaderValue2
        : null;
    },

    getCascaderOptions1: (state) => state.cascaderOptions1,

    getCascaderOptions2: (state) => state.cascaderOptions2,
  },

  mutations: {
    updateInputValue: (state, payload: { id: number; value: string }) => {
      const button = state.buttons.find((button) => button.id === payload.id);
      if (button) button.inputValue = payload.value;
    },

    updateLinkValue: (state, payload: { id: number; value: string }) => {
      const button = state.buttons.find((button) => button.id === payload.id);
      if (button) button.linkValue = payload.value;
    },

    updateCascaderValue1: (
      state,
      { id, value }: { id: number; value: CascaderOption | null }
    ) => {
      const button = state.buttons.find((button) => button.id === id);
      if (button) button.cascaderValue1 = value;
    },

    updateCascaderValue2: (
      state,
      { id, value }: { id: number; value: CascaderOption | null }
    ) => {
      const button = state.buttons.find((button) => button.id === id);
      if (button) button.cascaderValue2 = value;
    },

    setCascaderOptions1: (state, options: CascaderOption[]) =>
      (state.cascaderOptions1 = options),

    setCascaderOptions2: (state, options: CascaderOption[]) =>
      (state.cascaderOptions2 = options),

    addButton: (state) => {
      state.buttons.push({
        id: state.buttons.length,
        inputValue: "",
        cascaderValue1: null,
        cascaderValue2: null,
        linkValue: "",
      });
    },

    deleteButton: (state, id: number) => {
      const index = state.buttons.findIndex((button) => button.id === id);
      if (index !== -1) {
        if (state.buttons.length === 1) {
          // Если это последний ряд, очищаем его
          state.buttons[index] = {
            id: 0,
            inputValue: "",
            cascaderValue1: null,
            cascaderValue2: null,
            linkValue: "",
          };
        } else {
          // Иначе удаляем ряд
          state.buttons.splice(index, 1);
        }
      }
    },

    addInitialButton: (state, button) => {
      if (button && button.length > 0) {
        // Если данные с сервера пришли и они не пусты, перезаписываем массив
        state.buttons = button;
      }
    },
  },

  actions: {
    fetchInitialButton({ commit }) {
      axios
        .get("http://localhost:3000/get-initial-button") // Заменить на нужный адрес!!!
        .then((response) => {
          commit("addInitialButton", response.data);
        })
        .catch((error) => {
          console.error("Ошибка при получении кнопок:", error);
        });
    },

    fetchCascaderOptions1({ commit }) {
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

          commit("setCascaderOptions1", updatedData);
        });
    },

    fetchCascaderOptions2({ commit }) {
      axios
        .get<CascaderOption[]>("http://localhost:3000/get-cascader2-data") // Заменить на нужный адрес!!!
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

          commit("setCascaderOptions2", updatedData);
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
  },
};

export default buttons;
