import { ref } from "vue";
import { useStore } from "vuex";
import { TabPaneName } from "element-plus";

export function useButtonsCard(notificationId: string) {
  const store = useStore();
  const ActiveButtonTab = ref("1");

  const handleTabsEdit = (
    paneName: TabPaneName | undefined,
    action: "add" | "remove"
  ) => {
    store.dispatch("notifications/handleTabsEdit", {
      notificationId,
      paneName,
      action,
    });
  };

  return {
    ActiveButtonTab,
    handleTabsEdit,
  };
}
