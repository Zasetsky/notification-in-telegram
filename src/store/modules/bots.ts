import { Module } from "vuex";
import {
  StateBot,
  Bot,
} from "@/components/notification-component/steps/botTypes";
import { RootState } from "../storeTypes";
import axios from "axios";

const bots: Module<StateBot, RootState> = {
  namespaced: true,
  state: {
    availableBots: [],
  },
  getters: {
    getAvailableBots: (state): Bot[] => state.availableBots,
  },
  mutations: {
    setAvailableBots: (state, bots) => (state.availableBots = bots),
  },
  actions: {
    fetchAvailableBots({ commit }) {
      axios
        .get("http://localhost:3000/get-telegram-bots") // Сменить на нужный сервер!!!
        .then((response) => {
          commit("setAvailableBots", response.data);
        })
        .catch((error) => {
          console.error("Ошибка при получении ботов:", error);
        });
    },
  },
};

export default bots;
