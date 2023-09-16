import { ref } from "vue";
import { useStore } from "vuex";
import { TabPaneName } from "element-plus";
import { Button } from "@/components/notification-component/notificationTypes";

export function useButtonsCard(notificationId: string, buttons: Button[]) {
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

    if (action === "remove" && paneName) {
      const buttonIds = buttons.map((button) => button.id);
      const currentIndex = buttonIds.indexOf(String(paneName));

      if (currentIndex < buttonIds.length - 1) {
        ActiveButtonTab.value = buttonIds[currentIndex + 1].toString();
      } else if (currentIndex > 0) {
        ActiveButtonTab.value = buttonIds[currentIndex - 1].toString();
      }
    }
  };

  return {
    ActiveButtonTab,
    handleTabsEdit,
  };
}
