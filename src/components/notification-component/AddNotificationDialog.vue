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

    <StepOne
      v-if="activeStep === 0"
      @next="nextStep"
      :notificationId="notificationId"
    />
    <StepTwo v-if="activeStep === 1" :notificationId="notificationId" />
    <div class="notification-dialog__button-wrapper">
      <el-button class="btn" @click="cancelDialog">Отмена</el-button>
      <el-button v-if="activeStep === 0" class="fill-btn" @click="nextStep"
        >Далее <chevron_icon
      /></el-button>
      <div v-if="activeStep === 1">
        <el-button
          class="btn"
          @click="prevStep"
          @mouseenter="hover = true"
          @mouseleave="hover = false"
        >
          <chevron_back_icon :hover="hover" />Назад
        </el-button>
        <el-button class="fill-btn">Создать оповещение</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import StepOne from "./steps/StepOne.vue";
import StepTwo from "./steps/StepTwo.vue";
import { ElDialog, ElSteps, ElStep, ElButton } from "element-plus";
import { chevron_icon, chevron_back_icon } from "@/assets/icons/index";

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

    notificationId: {
      type: String,
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
    chevron_back_icon,
  },
  setup(props, { emit }) {
    const activeStep = ref(0);
    const isDialogVisible = ref(props.visible);
    const hover = ref(false);

    watch(
      () => props.visible,
      (newValue) => {
        isDialogVisible.value = newValue;
      }
    );

    const closeDialog = () => {
      emit("close");
    };

    const cancelDialog = () => {
      activeStep.value = 0;
      closeDialog();
    };

    const nextStep = () => {
      activeStep.value++;
    };

    const prevStep = () => {
      if (activeStep.value > 0) {
        activeStep.value--;
        hover.value = false;
      }
    };

    return {
      isDialogVisible,
      activeStep,
      hover,
      closeDialog,
      cancelDialog,
      nextStep,
      prevStep,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets//styles//notification-dialog.scss";
</style>
