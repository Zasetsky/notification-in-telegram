import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { SelectedEmployee } from "@/types";

export function useEmployees() {
  const store = useStore();
  const selectedEmployees = computed<SelectedEmployee[]>(() => {
    return store.getters["employees/getSelectedEmployees"];
  });

  const addUser = () => {
    const newUser = {
      id: new Date().getTime(),
      name: "",
      telegramID: "",
      selectedEmployeeID: undefined,
      isNew: true,
    };
    selectedEmployees.value.push(newUser);
  };

  onMounted(async () => {
    await store.dispatch("employees/fetchSelectedEmployees");
  });

  return {
    selectedEmployees,
    addUser,
  };
}
