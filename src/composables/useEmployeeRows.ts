import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { SelectedEmployee, Employee } from "@/types";
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

  const checkAndSubmit = async (field: string) => {
    const isEditing = selectedEmployees.value.some((selectedEmployee) => {
      return (
        name.value === selectedEmployee.name &&
        telegramID.value === selectedEmployee.telegramID
      );
    }); // true если редактируем, false если создаем нового

    const apiUrl = isEditing
      ? "http://localhost:3000/edit-employee"
      : "http://localhost:3000/add-employee";

    // Проверка полей на ошибки
    nameError.value = !name.value;
    telegramIDError.value = !telegramID.value;

    // Если хотя бы одно поле заполнено, проверяем оба поля
    if (name.value || telegramID.value) {
      // Если оба поля заполнены, отправляем данные на сервер
      if (name.value && telegramID.value) {
        try {
          await axios.post(apiUrl, {
            name: name.value,
            telegramID: telegramID.value,
            selectedEmployeeID: selectedEmployeeID.value,
          });
        } catch (error) {
          console.error("Ошибка при отправке данных:", error);
        }

        // Сброс ошибок
        nameError.value = false;
        telegramIDError.value = false;
      } else {
        // Установка ошибок для незаполненных полей
        if (field === "name" && !name.value) {
          nameError.value = true;
        }

        if (field === "telegramID" && !telegramID.value) {
          telegramIDError.value = true;
        }
      }
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
  };
}
