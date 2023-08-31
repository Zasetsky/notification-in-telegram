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

  const checkAndSubmit = async (field: string, isNew: boolean, id: number) => {
    const apiUrl = isNew
      ? "http://localhost:3000/add-employee"
      : "http://localhost:3000/edit-employee";

    // Проверка полей на ошибки
    nameError.value = !name.value;
    telegramIDError.value = !telegramID.value;

    if (name.value || telegramID.value) {
      let shouldSend = true;

      if (!isNew) {
        // Найти сотрудника с данным id в selectedEmployees
        const existingEmployee = selectedEmployees.value.find(
          (employee) => employee.id === id
        );

        if (existingEmployee) {
          // Сравнение полей
          shouldSend =
            existingEmployee.name !== name.value ||
            existingEmployee.telegramID !== telegramID.value ||
            existingEmployee.selectedEmployeeID !== selectedEmployeeID.value;
        }
      }

      if (shouldSend) {
        if (name.value && telegramID.value) {
          try {
            await axios.post(apiUrl, {
              name: name.value,
              telegramID: telegramID.value,
              selectedEmployeeID: selectedEmployeeID.value,
              isNew: false,
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
    }
  };

  const deleteEmployee = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/delete-employee/${id}`);

      // Удалить локально из selectedEmployees
      store.commit("employees/deleteSelectedEmployee", id);
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
