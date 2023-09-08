import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export function useButtonContent(buttonId: string, notificationId: string) {
  const store = useStore();

  const cascaderOptions = computed(
    () => store.getters["notifications/getCascaderOptions"]
  );

  const inputValueModel = computed({
    get: () =>
      store.getters["notifications/getInputValue"](notificationId, buttonId),
    set: (value: string) =>
      store.commit("notifications/updateInputValue", {
        notificationId,
        id: buttonId,
        value,
      }),
  });

  const linkValueModel = computed({
    get: () =>
      store.getters["notifications/getLinkValue"](notificationId, buttonId),
    set: (value: string) =>
      store.commit("notifications/updateLinkValue", {
        notificationId,
        id: buttonId,
        value,
      }),
  });

  const cascaderValueModel = computed({
    get: () =>
      store.getters["notifications/getCascaderValue"](notificationId, buttonId),
    set: (value: string) =>
      store.commit("notifications/updateCascaderValue", {
        notificationId,
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
      store.getters["notifications/getChangeResponsible"](
        notificationId,
        buttonId
      ).deal,
    set: (value: boolean) =>
      store.commit("notifications/updateChangeResponsibleField", {
        notificationId,
        id: buttonId,
        field: "deal",
        value,
      }),
  });

  const changeResponsibleTask = computed({
    get: () =>
      store.getters["notifications/getChangeResponsible"](
        notificationId,
        buttonId
      ).task,
    set: (value: boolean) =>
      store.commit("notifications/updateChangeResponsibleField", {
        notificationId,
        id: buttonId,
        field: "task",
        value,
      }),
  });

  const changeResponsibleCompany = computed({
    get: () =>
      store.getters["notifications/getChangeResponsible"](
        notificationId,
        buttonId
      ).company,
    set: (value: boolean) =>
      store.commit("notifications/updateChangeResponsibleField", {
        notificationId,
        id: buttonId,
        field: "company",
        value,
      }),
  });

  const deleteMessage = computed({
    get: () =>
      store.getters["notifications/getDeleteMessage"](notificationId, buttonId),
    set: (value: boolean) =>
      store.commit("notifications/updateDeleteMessage", {
        notificationId,
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
