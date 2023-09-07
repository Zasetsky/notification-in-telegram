import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export function useButtonContent(buttonId: string) {
  const store = useStore();

  const cascaderOptions = computed(
    () => store.getters["notifications/getCascaderOptions"]
  );

  const inputValueModel = computed({
    get: () => store.getters["notifications/getInputValue"](buttonId),
    set: (value: string) =>
      store.commit("notifications/updateInputValue", { id: buttonId, value }),
  });

  const linkValueModel = computed({
    get: () => store.getters["notifications/getLinkValue"](buttonId),
    set: (value: string) =>
      store.commit("notifications/updateLinkValue", { id: buttonId, value }),
  });

  const cascaderValueModel = computed({
    get: () => store.getters["notifications/getCascaderValue"](buttonId),
    set: (value: string) =>
      store.commit("notifications/updateCascaderValue", {
        id: buttonId,
        value,
      }),
  });

  const isNotLinkValue = computed(() => {
    const cascaderValues = cascaderValueModel.value;
    return cascaderValues ? !cascaderValues.includes("link") : true;
  });

  const changeResponsibleDeal = computed({
    get: () =>
      store.getters["notifications/getChangeResponsible"](buttonId).deal,
    set: (value: boolean) =>
      store.commit("notifications/updateChangeResponsibleField", {
        id: buttonId,
        field: "deal",
        value,
      }),
  });

  const changeResponsibleTask = computed({
    get: () =>
      store.getters["notifications/getChangeResponsible"](buttonId).task,
    set: (value: boolean) =>
      store.commit("notifications/updateChangeResponsibleField", {
        id: buttonId,
        field: "task",
        value,
      }),
  });

  const changeResponsibleCompany = computed({
    get: () =>
      store.getters["notifications/getChangeResponsible"](buttonId).company,
    set: (value: boolean) =>
      store.commit("notifications/updateChangeResponsibleField", {
        id: buttonId,
        field: "company",
        value,
      }),
  });

  const deleteMessage = computed({
    get: () => store.getters["notifications/getDeleteMessage"](buttonId),
    set: (value: boolean) =>
      store.commit("notifications/updateDeleteMessage", {
        id: buttonId,
        value,
      }),
  });

  onMounted(() => {
    store.dispatch("notifications/fetchCascaderOptions");
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
