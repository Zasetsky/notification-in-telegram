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
    // Если это не новый сотрудник, ищем его в списке выбранных сотрудников
    if (!isNew) {
      const existingBot = createdBots.value.find((bot) => bot.id === id);
      // Если сотрудник найден, сравниваем поля
      if (existingBot) {
        return (
          existingBot.label !== label.value ||
          existingBot.token !== telegramToken.value ||
          existingBot.value !== value.value
        );
      }
    }
    // Если это новый сотрудник, отправляем данные
    return true;
  };

  // Отправка данных на сервер
  const sendData = async (apiUrl: string, id: number | null) => {
    try {
      // Отправляем POST-запрос с данными сотрудника
      await axios.post(apiUrl, {
        label: label.value,
        token: telegramToken.value,
        value: value.value,
        isNew: false,
      });

      // Обновляем данные сотрудника в хранилище Vuex
      store.commit("employees/updateSelectedEmployee", {
        id,
        label: label.value,
        telegramToken: telegramToken.value,
        value: value.value,
        isNew: false,
      });

      // Сбрасываем флаги ошибок
      labelError.value = false;
      telegramTokenError.value = false;
    } catch (error) {
      // Выводим ошибку в консоль, если что-то пошло не так
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

  const deleteBot = async (id: number | null) => {
    try {
      // Проверяем, является ли это последним элементом
      if (createdBots.value.length > 1) {
        await axios.delete(`http://localhost:3000/delete-employee/${id}`);

        // Удалить локально из createdBots
        store.commit("employees/deleteSelectedEmployee", id);
      } else {
        // Если это последний элемент, обнуляем все поля
        store.commit("employees/updateSelectedEmployee", {
          id,
          label: "",
          telegramToken: "",
          value: null,
          isNew: true,
        });
      }
    } catch (error) {
      console.error("Ошибка при удалении бота:", error);
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
    checkAndSubmit,
    deleteBot,
  };
}
