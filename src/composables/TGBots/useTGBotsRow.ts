import { ref, computed } from "vue";
import { useStore } from "vuex";
import { Bot } from "@/components/tg-bots-component/botsTypes";
import axios from "axios";

export function useTGBotsRows() {
  const label = ref<string>("");
  const telegramToken = ref<string>("");
  const value = ref<string | undefined>(undefined);
  const labelError = ref<boolean>(false);
  const telegramTokenError = ref<boolean>(false);
  const labelFocused = ref<boolean>(false);
  const telegramTokenFocused = ref<boolean>(false);
  const telegramTokenServerMessage = ref<string | null>(null);

  const store = useStore();

  const createdBots = computed<Bot[]>(() => {
    return store.getters["bots/getAvailableBots"];
  });

  // Валидация полей формы
  const validateFields = () => {
    // Устанавливаем ошибку для имени, если оно не введено
    labelError.value = !label.value;
    // Устанавливаем ошибку для ID в Telegram, если он не введен
    telegramTokenError.value = !telegramToken.value;
  };

  // Проверка, нужно ли отправлять данные на сервер
  const shouldSendData = (isNew: boolean, id: number | null) => {
    // Если это не новый бот, ищем его в списке выбранных сотрудников
    if (!isNew) {
      const existingBot = createdBots.value.find((bot) => bot.id === id);
      // Если бот найден, сравниваем поля
      if (existingBot) {
        return (
          existingBot.label !== label.value ||
          existingBot.token !== telegramToken.value
        );
      }
    }
    // Если это новый бот, отправляем данные
    return true;
  };

  // Отправка данных на сервер
  const sendData = async (apiUrl: string, id: number | null) => {
    try {
      const response = await axios.post(apiUrl, {
        label: label.value,
        token: telegramToken.value,
        value: value.value,
        isNew: false,
      });

      if (response.data.error) {
        telegramTokenServerMessage.value = response.data.error;
        return;
      }

      store.commit("employees/updateSelectedEmployee", {
        id,
        label: label.value,
        telegramToken: telegramToken.value,
        value: value.value,
        isNew: false,
      });

      labelError.value = false;
      telegramTokenError.value = false;
      telegramTokenServerMessage.value = null;
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  // Главная функция для проверки и отправки данных
  const checkAndSubmit = async (
    field: string,
    isNew: boolean,
    id: number | null
  ) => {
    // Определяем URL для API в зависимости от того, новый это сотрудник или нет
    const apiUrl = isNew
      ? "http://localhost:3000/add-bot"
      : "http://localhost:3000/edit-bot";

    // Валидируем поля
    validateFields();

    // Проверяем, заполнены ли хотя бы одно из полей
    if (label.value || telegramToken.value) {
      // Определяем, нужно ли отправлять данные
      const shouldSend = shouldSendData(isNew, id);
      // Если нужно отправить данные и все поля заполнены, отправляем
      if (shouldSend && label.value && telegramToken.value) {
        await sendData(apiUrl, id);
      } else {
        // Устанавливаем флаги ошибок для незаполненных полей
        if (field === "label" && !label.value) {
          labelError.value = true;
        }
        if (field === "telegramToken" && !telegramToken.value) {
          telegramTokenError.value = true;
        }
      }
    }
  };

  const saveBot = async (isNew: boolean, id: number | null) => {
    await checkAndSubmit("label", isNew, id);
    await checkAndSubmit("telegramToken", isNew, id);
    labelFocused.value = false;
    telegramTokenFocused.value = false;
  };

  const clearFields = async (id: number | null) => {
    try {
      // Отправляем DELETE-запрос на сервер для удаления бота
      await axios.post(`http://localhost:3000/clear-bot-fields/${id}`);

      // Обновляем локальное состояние
      store.commit("bots/updateSingleBot", {
        id,
        label: "",
        telegramToken: "",
        isNew: true,
      });

      // Очистка полей и сброс флагов
      label.value = "";
      telegramToken.value = "";
      labelError.value = false;
      telegramTokenError.value = false;
      labelFocused.value = false;
      telegramTokenFocused.value = false;
    } catch (error) {
      console.error("Ошибка при очистке полей:", error);
    }
  };

  return {
    label,
    telegramToken,
    value,
    labelError,
    telegramTokenError,
    labelFocused,
    telegramTokenFocused,
    telegramTokenServerMessage,
    saveBot,
    clearFields,
  };
}
