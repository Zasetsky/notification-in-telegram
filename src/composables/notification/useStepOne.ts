import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import {
  Employee,
  TransferEmployee,
} from "@/components/notification-component/notificationTypes";

export default function useStepOne(notificationId: string) {
  const store = useStore();

  const localNotificationName = ref("");

  const allEmployees = computed<Employee[]>(
    () => store.getters["employees/getEmployees"]
  );

  const tempNotificationName = computed<string>(() => {
    return store.state.notifications.tempNotificationName;
  });

  const transformedEmployees = computed<TransferEmployee[]>(() => {
    return allEmployees.value.map((emp: Employee) => {
      return {
        key: emp.id,
        label: emp.name,
        initial: emp.initial,
      };
    });
  });

  const selectedEmployeeKeys = computed<number[]>({
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

  watch(localNotificationName, (newVal) => {
    store.commit("notifications/setTempNotificationName", newVal);
  });

  const filterMethod = (query: string, item: Record<string, any>): boolean => {
    if (typeof item.label === "string") {
      return item.label.toLowerCase().includes(query.toLowerCase());
    }
    return false;
  };

  onMounted(() => {
    const notification =
      store.getters["notifications/getNotification"](notificationId);

    // Проверка, был ли уже инициализирован компонент с данным notificationId
    const isInitialized =
      store.state.notifications.initializedComponents[notificationId];

    if (isInitialized) {
      // Если компонент уже был инициализирован, установить localNotificationName в значение tempNotificationName
      localNotificationName.value = tempNotificationName.value;
    } else if (notification) {
      // Если это первая инициализация, установить localNotificationName в значение из notification
      localNotificationName.value = notification.name;
      // Отметить компонент как инициализированный
      store.commit("notifications/setComponentInitialized", {
        notificationId,
        value: true,
      });
    }
  });

  return {
    transformedEmployees,
    selectedEmployeeKeys,
    localNotificationName,
    filterMethod,
  };
}
