import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { Employee } from "@/components/notification-component/notificationTypes";

interface TransferEmployee {
  key: number;
  label: string;
  initial: string;
}

export default function useStepOne(notificationId: string) {
  const store = useStore();

  const notificationName = computed({
    get: () => {
      const notification =
        store.getters["notifications/getNotification"](notificationId);
      return notification ? notification.name : "";
    },
    set: (newName: string) => {
      store.commit("notifications/updateNotificationName", {
        notificationId,
        name: newName,
      });
    },
  });

  const allEmployees = computed(() => store.getters["employees/getEmployees"]);

  const transformedEmployees = computed<TransferEmployee[]>(() => {
    return allEmployees.value.map((emp: Employee) => {
      return {
        key: emp.id,
        label: emp.name,
        initial: emp.initial,
      };
    });
  });

  const selectedEmployeeKeys = computed({
    get: () => {
      const selected =
        store.getters["notifications/getSelectedEmployees"](notificationId);
      return selected.map((emp: Employee) => emp.id);
    },
    set: (newVal: number[]) => {
      const selected = allEmployees.value.filter((emp: Employee) =>
        newVal.includes(emp.id)
      );
      store.commit("notifications/setSelectedEmployees", {
        notificationId,
        employees: selected,
      });
    },
  });

  const filterMethod = (query: string, item: Record<string, any>): boolean => {
    if (typeof item.label === "string") {
      return item.label.toLowerCase().includes(query.toLowerCase());
    }
    return false;
  };

  onMounted(async () => {
    await store.dispatch("employees/fetchEmployees");
  });

  return {
    transformedEmployees,
    selectedEmployeeKeys,
    notificationName,
    filterMethod,
  };
}
