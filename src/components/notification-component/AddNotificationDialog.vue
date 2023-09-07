<template>
  <el-dialog
    v-model="isDialogVisible"
    v-if="isDialogVisible"
    title="Создание оповещения"
    @close="closeDialog"
    class="notification-dialog"
  >
    <el-steps :active="activeStep" finish-status="success" simple>
      <el-step title="Шаг 1"></el-step>
      <el-step title="Шаг 2"></el-step>
    </el-steps>

    <StepOne v-if="activeStep === 0" @next="nextStep" />
    <StepTwo v-if="activeStep === 1" />
    <div class="notification-dialog__button-wrapper">
      <el-button>Отмена</el-button>
      <el-button>Назад</el-button>
      <el-button class="next-btn" @click="nextStep"
        >Далее <chevron_icon
      /></el-button>
      <el-button>Создать оповещение</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import StepOne from "./steps/StepOne.vue";
import StepTwo from "./steps/StepTwo.vue";
import { ElDialog, ElSteps, ElStep, ElButton } from "element-plus";
import { chevron_icon } from "@/assets/icons/index";

import "element-plus/es/components/dialog/style/css";
import "element-plus/es/components/steps/style/css";
import "element-plus/es/components/step/style/css";
import "element-plus/es/components/button/style/css";

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    StepOne,
    StepTwo,
    ElDialog,
    ElSteps,
    ElStep,
    ElButton,
    chevron_icon,
  },
  setup(props, { emit }) {
    const activeStep = ref(0);
    const isDialogVisible = ref(props.visible);

    watch(
      () => props.visible,
      (newValue) => {
        console.log("Watch triggered, new value: ", newValue);
        isDialogVisible.value = newValue;
      }
    );

    const closeDialog = () => {
      emit("close");
    };

    const nextStep = () => {
      activeStep.value++;
    };

    return {
      isDialogVisible,
      activeStep,
      closeDialog,
      nextStep,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets//styles//notification-dialog.scss";
</style>
