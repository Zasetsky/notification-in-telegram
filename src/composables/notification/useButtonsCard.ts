import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { TabPaneName } from "element-plus";

export function useButtonsCard() {
  const store = useStore();
  const ActiveButtonTab = ref("1");
  const buttons = computed(() => store.getters["buttons/getAllButtons"]);

  const handleTabsEdit = (
    paneName: TabPaneName | undefined,
    action: "add" | "remove"
  ) => {
    store.dispatch("buttons/handleTabsEdit", { paneName, action });
  };

  const changeTab = (id: string) => {
    store.dispatch("buttons/changeActiveTab", id);
  };

  onMounted(() => {
    store.dispatch("buttons/fetchInitialButton");
  });

  return {
    ActiveButtonTab,
    buttons,
    handleTabsEdit,
    changeTab,
  };
}
