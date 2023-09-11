<template>
  <div class="step-two">
    <TextField :notificationId="notificationId" />
    <div class="step-two__select-wrapper">
      <p>Использовать бота</p>
      <el-select
        v-model="selectedBot"
        :disabled="isDisabled"
        placeholder="Выберите бота"
      >
        <el-option
          v-for="option in availableBots"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
    </div>
    <ButtonsCard :notificationId="notificationId" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from "vue";
import TextField from "./textarea/TextField.vue";
import { useStore } from "vuex";
import { Bot } from "./botTypes";
import ButtonsCard from "./buttons/ButtonsCard.vue";
import { ElSelect, ElOption } from "element-plus";

import "element-plus/es/components/select/style/css";
import "element-plus/es/components/option/style/css";

export default defineComponent({
  components: {
    TextField,
    ElSelect,
    ElOption,
    ButtonsCard,
  },

  props: {
    notificationId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();
    const isDisabled = ref(false);

    const selectedBot = computed({
      get: () =>
        store.getters["notifications/getSelectedBot"](props.notificationId),
      set: (newBot: Bot) =>
        store.commit("notifications/updateSelectedBot", {
          notificationId: props.notificationId,
          bot: newBot,
        }),
    });

    const availableBots = computed(() => {
      return store.getters["bots/getAvailableBots"];
    });

    watch(availableBots, (newVal) => {
      if (newVal.length <= 1) {
        const rkrsBot = newVal.find((bot: Bot) => bot.value === "rkrs");
        if (rkrsBot) {
          selectedBot.value = rkrsBot;
        }
        isDisabled.value = true;
      } else {
        isDisabled.value = false;
      }
    });

    onMounted(async () => {
      await store.dispatch("bots/fetchAvailableBots");
    });

    return {
      selectedBot,
      availableBots,
      isDisabled,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/step2.scss";
</style>
