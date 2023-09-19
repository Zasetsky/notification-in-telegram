<template>
  <div class="step-one">
    <div class="step-one__fields-wrapper">
      <el-input
        class="step-one--input"
        placeholder="Введите название оповещения"
        v-model="localNotificationName"
      />

      <p>Выберите сотрудников, которые будут получать оповещения</p>

      <el-transfer
        v-model="selectedEmployeeKeys"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="Начните ввод..."
        :titles="['Все сотрудники', 'Получатели']"
        :data="transformedEmployees"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useStepOne from "@/composables/notification/useStepOne";
import { ElTransfer, ElInput } from "element-plus";

import "element-plus/es/components/button/style/css";
import "element-plus/es/components/transfer/style/css";
import "element-plus/es/components/input/style/css";

export default defineComponent({
  components: {
    ElTransfer,
    ElInput,
  },
  props: {
    notificationId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const {
      transformedEmployees,
      selectedEmployeeKeys,
      localNotificationName,
      filterMethod,
    } = useStepOne(props.notificationId);

    return {
      transformedEmployees,
      selectedEmployeeKeys,
      localNotificationName,
      filterMethod,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/step1.scss";
</style>
