import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export function useEmployees() {
  const store = useStore();
  const selectedEmployees = computed(() => {
    return store.getters["employees/getSelectedEmployees"];
  });

  const addUser = () => {
    const newUser = {
      name: "",
      telegramID: "",
      selectedEmployeeID: null,
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
