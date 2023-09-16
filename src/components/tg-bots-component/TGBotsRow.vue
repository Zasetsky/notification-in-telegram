<template>
  <div class="employee-row">
    <div class="employee-row__grid">
      <div class="employee-row__item">
        <el-input
          v-model="label"
          placeholder="Введите имя"
          :class="{ 'error-border': labelError && !labelFocused }"
          @focus="labelFocused = true"
          @blur="
            checkAndSubmit('label', bot.isNew, bot.id);
            labelFocused = false;
          "
        />
        <span v-if="labelError && !labelFocused" class="error-text"
          >Без имени данные не будут сохранены</span
        >
      </div>
      <div class="employee-row__item">
        <el-input
          v-model="telegramToken"
          placeholder="Укажите ID"
          :class="{
            'error-border': telegramTokenError && !telegramTokenFocused,
          }"
          @focus="telegramTokenFocused = true"
          @blur="
            checkAndSubmit('telegramToken', bot.isNew, bot.id);
            telegramTokenFocused = false;
          "
        />
        <span
          v-if="telegramTokenError && !telegramTokenFocused"
          class="error-text"
          >Без ID данные не будут сохранены</span
        >
      </div>
    </div>
    <delete_icon class="delete-icon" @click="deleteBot(bot.id)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from "vue";
import { useTGBotsRows } from "@/composables/TGBots/useTGBotsRow";
import { Bot } from "./botsTypes";

import { delete_icon } from "@/assets/icons/index";
import { ElInput } from "element-plus";
import "element-plus/es/components/input/style/css";
import "element-plus/es/components/select/style/css";
import "element-plus/es/components/option/style/css";

export default defineComponent({
  components: {
    delete_icon,
    ElInput,
  },

  props: {
    bot: {
      type: Object as PropType<Bot>,
      required: true,
    },
  },

  setup(props) {
    const {
      label,
      telegramToken,
      value,
      labelError,
      telegramTokenError,
      labelFocused,
      telegramTokenFocused,
      checkAndSubmit,
      deleteBot,
    } = useTGBotsRows();

    watch(
      () => props.bot,
      (newVal) => {
        if (newVal) {
          label.value = newVal.label;
          telegramToken.value = newVal.token;
          value.value = newVal.value;
        }
      },
      { immediate: true }
    );

    return {
      label,
      telegramToken,
      value,
      labelError,
      telegramTokenError,
      labelFocused,
      telegramTokenFocused,
      checkAndSubmit,
      deleteBot,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/employee-row.scss";
</style>
