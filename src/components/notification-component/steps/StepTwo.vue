<template>
  <div class="step-two">
    <TextField />
    <div class="step-two__select-wrapper">
      <p>Использовать бота</p>
      <el-select v-model="selectedBot" placeholder="Выберите бота">
        <el-option
          v-for="option in availableBots"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
    </div>
    <ButtonsCard />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
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

  setup() {
    const store = useStore();

    const selectedBot = ref<Bot | undefined>();

    const availableBots = computed(() => store.getters.getAvailableBots);

    return {
      selectedBot,
      availableBots,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/step2.scss";
</style>
