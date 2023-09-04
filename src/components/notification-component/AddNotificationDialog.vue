<template>
  <el-dialog
    v-model="isDialogVisible"
    v-if="isDialogVisible"
    title="Создание оповещения"
    @close="closeDialog"
    class="notification-dialog"
  >
    <div>
      <el-steps :active="activeStep" finish-status="success" simple>
        <el-step title="Шаг 1"></el-step>
        <el-step title="Шаг 2"></el-step>
      </el-steps>

      <StepOne v-if="activeStep === 0" @next="nextStep" />
      <StepTwo v-if="activeStep === 1" />
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from "vue";
import StepOne from "./steps/StepOne.vue";
import StepTwo from "./steps/StepTwo.vue";
import { ElDialog, ElSteps, ElStep } from "element-plus";
import "element-plus/es/components/dialog/style/css";
import "element-plus/es/components/steps/style/css";
import "element-plus/es/components/step/style/css";

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
