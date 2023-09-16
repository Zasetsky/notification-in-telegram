<template>
  <div class="tg-bots-component">
    <h4 class="tg-bots-component--header">
      Сотрудники <span> / инструкция</span>
    </h4>
    <p class="tg-bots-component--info">
      Сопоставьте менеджеров в amoCRM и Telegram для дальнейшей работы со
      сценариями. Чтобы получить ID в Telegram, запустите бота
      <a href="_ref">rkrs_bot</a>
    </p>
    <div class="tg-bots-component__grid-wrapper">
      <div class="tg-bots-component__grid">
        <span class="tg-bots-component__header-item">Имя</span>
        <span class="tg-bots-component__header-item">ID в Telegram</span>
        <span class="tg-bots-component__header-item">Пользователь amoCRM</span>
      </div>
      <TGBotsRow v-for="(bot, index) in createdBots" :key="index" :bot="bot" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTGBots } from "@/composables/TGBots/useTGBots";
import { ElButton } from "element-plus";
import "element-plus/es/components/button/style/css";
import TGBotsRow from "./TGBotsRow.vue";

export default defineComponent({
  components: { ElButton, TGBotsRow },
  setup() {
    const { createdBots } = useTGBots();

    return {
      createdBots,
    };
  },
});
</script>

<style lang="scss"></style>
