import { ref, onMounted } from "vue";
import { useStore } from "vuex";

export function useEmployees() {
  const store = useStore();
  const firstName = ref("");
  const lastName = ref("");
  const selectedEmployee = ref(null);

  onMounted(async () => {
    await store.dispatch("employees/fetchEmployees");
  });

  const employees = store.state.employees;

  return {
    firstName,
    lastName,
    employees,
    selectedEmployee,
  };
}
