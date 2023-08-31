import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { Employee, SelectedEmployee } from "@/types";
import axios from "axios";

export function useEmployeeRows() {
  const name = ref<string>("");
  const telegramID = ref<string>("");
  const selectedEmployeeID = ref<number | null>(null);
  const nameError = ref<boolean>(false);
  const telegramIDError = ref<boolean>(false);
  const nameFocused = ref<boolean>(false);
  const telegramIDFocused = ref<boolean>(false);

  const store = useStore();

  const employees = computed<Employee[]>(() => {
    return store.getters["employees/getEmployees"];
  });

  const selectedEmployees = computed<SelectedEmployee[]>(() => {
    return store.getters["employees/getSelectedEmployees"];
  });

  // Валидация полей формы
  const validateFields = () => {
    // Устанавливаем ошибку для имени, если оно не введено
    nameError.value = !name.value;
    // Устанавливаем ошибку для ID в Telegram, если он не введен
    telegramIDError.value = !telegramID.value;
  };

  // Проверка, нужно ли отправлять данные на сервер
  const shouldSendData = (isNew: boolean, id: number | null) => {
    // Если это не новый сотрудник, ищем его в списке выбранных сотрудников
    if (!isNew) {
      const existingEmployee = selectedEmployees.value.find(
        (employee) => employee.id === id
      );
      // Если сотрудник найден, сравниваем поля
      if (existingEmployee) {
        return (
          existingEmployee.name !== name.value ||
          existingEmployee.telegramID !== telegramID.value ||
          existingEmployee.selectedEmployeeID !== selectedEmployeeID.value
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
        name: name.value,
        telegramID: telegramID.value,
        selectedEmployeeID: selectedEmployeeID.value,
        isNew: false,
      });

      // Обновляем данные сотрудника в хранилище Vuex
      store.commit("employees/updateSelectedEmployee", {
        id,
        name: name.value,
        telegramID: telegramID.value,
        selectedEmployeeID: selectedEmployeeID.value,
        isNew: false,
      });

      // Сбрасываем флаги ошибок
      nameError.value = false;
      telegramIDError.value = false;
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
      ? "http://localhost:3000/add-employee"
      : "http://localhost:3000/edit-employee";

    // Валидируем поля
    validateFields();

    // Проверяем, заполнены ли хотя бы одно из полей
    if (name.value || telegramID.value) {
      // Определяем, нужно ли отправлять данные
      const shouldSend = shouldSendData(isNew, id);
      // Если нужно отправить данные и все поля заполнены, отправляем
      if (shouldSend && name.value && telegramID.value) {
        await sendData(apiUrl, id);
      } else {
        // Устанавливаем флаги ошибок для незаполненных полей
        if (field === "name" && !name.value) {
          nameError.value = true;
        }
        if (field === "telegramID" && !telegramID.value) {
          telegramIDError.value = true;
        }
      }
    }
  };

  const deleteEmployee = async (id: number | null) => {
    try {
      // Проверяем, является ли это последним элементом
      if (selectedEmployees.value.length > 1) {
        await axios.delete(`http://localhost:3000/delete-employee/${id}`);

        // Удалить локально из selectedEmployees
        store.commit("employees/deleteSelectedEmployee", id);
      } else {
        // Если это последний элемент, обнуляем все поля
        store.commit("employees/updateSelectedEmployee", {
          id,
          name: "",
          telegramID: "",
          selectedEmployeeID: null,
          isNew: true,
        });
      }
    } catch (error) {
      console.error("Ошибка при удалении сотрудника:", error);
    }
  };

  onMounted(async () => {
    await store.dispatch("employees/fetchEmployees");
  });

  return {
    name,
    telegramID,
    selectedEmployeeID,
    employees,
    nameError,
    telegramIDError,
    nameFocused,
    telegramIDFocused,
    checkAndSubmit,
    deleteEmployee,
  };
}
