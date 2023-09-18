import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { Bot } from "@/components/tg-bots-component/botsTypes";

export function useTGBots() {
  const store = useStore();

  const createdBots = computed<Bot[]>(() => {
    return store.getters["bots/getAvailableBots"];
  });

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("@rkrs_bot");
    } catch (err) {
      console.error("Не удалось скопировать текст: ", err);
    }
  };

  onMounted(async () => {
    await store.dispatch("bots/fetchAvailableBots");
  });

  return {
    createdBots,
    copyToClipboard,
  };
}
