import { Module } from "vuex";
import { StateBot, Bot } from "@/components/tg-bots-component/botsTypes";
import { RootState } from "../storeTypes";
import axios from "axios";

const bots: Module<StateBot, RootState> = {
  namespaced: true,
  state: {
    availableBots: [
      { id: 1, label: "", token: "", isNew: false },
      { id: 2, label: "", token: "", isNew: false },
    ],
  },

  getters: {
    getAvailableBots: (state): Bot[] => state.availableBots,
  },

  mutations: {
    setAvailableBots: (state: StateBot, newBots: Bot[]) => {
      state.availableBots = state.availableBots.map((existingBot: Bot): Bot => {
        // Поиск бота с тем же ID в новом массиве
        const matchingBot = newBots.find(
          (newBot: Bot) => newBot.id === existingBot.id
        );

        // Если найден, заменить данными из нового массива
        return matchingBot ? matchingBot : existingBot;
      });

      // Если есть новые боты, которых нет в существующем массиве, добавить их
      const newBotIds: number[] = newBots.map((bot: Bot) => bot.id);
      const existingBotIds: number[] = state.availableBots.map(
        (bot: Bot) => bot.id
      );
      newBotIds.forEach((id: number) => {
        if (!existingBotIds.includes(id)) {
          const botToAdd = newBots.find((bot: Bot) => bot.id === id);
          if (botToAdd) {
            state.availableBots.push(botToAdd);
          }
        }
      });
    },

    updateSingleBot: (state: StateBot, updatedBot: Bot) => {
      const index = state.availableBots.findIndex(
        (bot) => bot.id === updatedBot.id
      );
      state.availableBots[index] = updatedBot;
    },
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
