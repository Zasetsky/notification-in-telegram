<template>
  <div class="tg-bots-row">
    <div class="tg-bots-row__grid">
      <div class="tg-bots-row__item">
        <el-input
          v-model="label"
          placeholder="Введите название бота"
          :class="{ 'error-border': labelError && !labelFocused }"
          @focus="labelFocused = true"
        />
        <span v-if="labelError && !labelFocused" class="error-text"
          >Без названия данные не будут сохранены</span
        >
      </div>
      <div class="tg-bots-row__item">
        <el-input
          v-model="telegramToken"
          placeholder="Укажите токен бота"
          :class="{
            'error-border': telegramTokenError && !telegramTokenFocused,
          }"
          @focus="telegramTokenFocused = true"
        />
        <span
          v-if="telegramTokenError && !telegramTokenFocused"
          class="error-text"
          >Без токена данные не будут сохранены</span
        >
        <span v-if="telegramTokenServerMessage" class="error-text">{{
          telegramTokenServerMessage
        }}</span>
      </div>
    </div>
    <el-button
      @mouseover="isHovered = true"
      @mouseout="isHovered = false"
      @click="saveBot(bot.isNew, bot.id)"
    >
      <save_icon :hover="isHovered" />Сохранить
    </el-button>
    <delete_icon class="delete-icon" @click="clearFields(bot.id)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref } from "vue";
import { useTGBotsRows } from "@/composables/TGBots/useTGBotsRow";
import { Bot } from "./botsTypes";

import { delete_icon, save_icon } from "@/assets/icons/index";
import { ElInput, ElButton } from "element-plus";
import "element-plus/es/components/button/style/css";
import "element-plus/es/components/input/style/css";
import "element-plus/es/components/message/style/css";

export default defineComponent({
  components: {
    delete_icon,
    ElInput,
    ElButton,
    save_icon,
  },

  props: {
    bot: {
      type: Object as PropType<Bot>,
      required: true,
    },
  },

  setup(props) {
    const isHovered = ref<boolean>(false);

    const {
      label,
      telegramToken,
      value,
      labelError,
      telegramTokenError,
      labelFocused,
      telegramTokenFocused,
      telegramTokenServerMessage,
      saveBot,
      clearFields,
    } = useTGBotsRows();

    watch(
      () => props.bot,
      (newVal) => {
        if (newVal) {
          label.value = newVal.label;
          telegramToken.value = newVal.token;
        }
      },
      { immediate: true }
    );

    return {
      isHovered,
      label,
      telegramToken,
      value,
      labelError,
      telegramTokenError,
      labelFocused,
      telegramTokenFocused,
      telegramTokenServerMessage,
      saveBot,
      clearFields,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/tg-bots-row.scss";
</style>
