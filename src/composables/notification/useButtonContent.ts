import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export function useButtonContent(buttonId: string) {
  const store = useStore();

  const cascaderOptions = computed(
    () => store.getters["buttons/getCascaderOptions"]
  );

  const inputValueModel = computed({
    get: () => store.getters["buttons/getInputValue"](buttonId),
    set: (value: string) =>
      store.commit("buttons/updateInputValue", { id: buttonId, value }),
  });

  const linkValueModel = computed({
    get: () => store.getters["buttons/getLinkValue"](buttonId),
    set: (value: string) =>
      store.commit("buttons/updateLinkValue", { id: buttonId, value }),
  });

  const cascaderValueModel = computed({
    get: () => store.getters["buttons/getCascaderValue"](buttonId),
    set: (value: string) =>
      store.commit("buttons/updateCascaderValue", { id: buttonId, value }),
  });

  const isNotLinkValue = computed(() => {
    const cascaderValues = cascaderValueModel.value;
    return cascaderValues ? !cascaderValues.includes("link") : true;
  });

  const changeResponsibleDeal = computed({
    get: () => store.getters["buttons/getChangeResponsible"](buttonId).deal,
    set: (value: boolean) =>
      store.commit("buttons/updateChangeResponsibleField", {
        id: buttonId,
        field: "deal",
        value,
      }),
  });

  const changeResponsibleTask = computed({
    get: () => store.getters["buttons/getChangeResponsible"](buttonId).task,
    set: (value: boolean) =>
      store.commit("buttons/updateChangeResponsibleField", {
        id: buttonId,
        field: "task",
        value,
      }),
  });

  const changeResponsibleCompany = computed({
    get: () => store.getters["buttons/getChangeResponsible"](buttonId).company,
    set: (value: boolean) =>
      store.commit("buttons/updateChangeResponsibleField", {
        id: buttonId,
        field: "company",
        value,
      }),
  });

  const deleteMessage = computed({
    get: () => store.getters["buttons/getDeleteMessage"](buttonId),
    set: (value: boolean) =>
      store.commit("buttons/updateDeleteMessage", {
        id: buttonId,
        value,
      }),
  });

  onMounted(() => {
    store.dispatch("buttons/fetchCascaderOptions");
  });

  return {
    inputValueModel,
    cascaderOptions,
    cascaderValueModel,
    isNotLinkValue,
    linkValueModel,
    changeResponsibleDeal,
    changeResponsibleTask,
    changeResponsibleCompany,
    deleteMessage,
  };
}
