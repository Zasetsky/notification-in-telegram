<template>
  <div class="tg-bots-component" v-loading="loading">
    <h4 class="tg-bots-component--header">Боты <span> / инструкция</span></h4>
    <div class="tg-bots-component__copy-button-wrapper">
      <p class="tg-bots-component__copy-button-wrapper-info">
        По умолчанию используется бот от компании Rakurs:
      </p>
      <div class="tg-bots-component__copy-button">
        <p class="tg-bots-component__copy-button-title">@rkrs_bot</p>
        <el-button
          @click="copyToClipboard"
          @mouseover="isHovered = true"
          @mouseout="isHovered = false"
          ><copy_bot_icon :hover="isHovered" />Копировать</el-button
        >
      </div>
    </div>
    <p class="tg-bots-component--info">
      Если вы хотите создать своего бота, вы можете воспользоваться
      <a href="https://telegram.me/BotFather" target="_blank">@BotFather</a> в
      Telegram и сохранить его, заполнив поля ниже
    </p>
    <div class="tg-bots-component__grid-wrapper">
      <TGBotsRow v-for="(bot, index) in createdBots" :key="index" :bot="bot" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useTGBots } from "@/composables/TGBots/useTGBots";
import { copy_bot_icon } from "@/assets/icons/index";
import TGBotsRow from "./TGBotsRow.vue";

import { ElButton, vLoading } from "element-plus";
import "element-plus/es/components/button/style/css";
import "element-plus/es/components/loading/style/css";

export default defineComponent({
  directives: {
    loading: vLoading,
  },

  components: { ElButton, copy_bot_icon, TGBotsRow },

  setup() {
    const isHovered = ref<boolean>(false);
    const { createdBots, loading, copyToClipboard } = useTGBots();

    return {
      createdBots,
      isHovered,
      loading,
      copyToClipboard,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/tg-bots.scss";
</style>
