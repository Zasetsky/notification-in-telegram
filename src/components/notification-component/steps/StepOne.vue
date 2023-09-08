<template>
  <div class="step-one">
    <div class="step-one__fields-wrapper">
      <el-input
        class="step-one--input"
        placeholder="Введите название сценария"
      />

      <p>Выберите сотрудников, которые будут получать оповещения</p>

      <el-transfer
        v-model="selectedEmployeeKeys"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="State Abbreviations"
        :data="transformedEmployees"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { ElTransfer, ElInput } from "element-plus";
import { Employee } from "../notificationTypes";

import "element-plus/es/components/button/style/css";
import "element-plus/es/components/transfer/style/css";
import "element-plus/es/components/input/style/css";

interface TransferEmployee {
  key: number;
  label: string;
  initial: string;
}

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

  setup(props, { emit }) {
    const store = useStore();

    const allEmployees = computed(() =>
      store.getters["notifications/getEmployees"](props.notificationId)
    );

    const transformedEmployees = computed<TransferEmployee[]>(() => {
      return allEmployees.value.map((emp: Employee) => {
        return {
          key: emp.id,
          label: emp.name,
          initial: emp.initial,
        };
      });
    });

    const selectedEmployeeKeys = computed({
      get: () => {
        const selected = store.getters["notifications/getSelectedEmployees"](
          props.notificationId
        );
        return selected.map((emp: Employee) => emp.id);
      },
      set: (newVal: number[]) => {
        const selected = allEmployees.value.filter((emp: Employee) =>
          newVal.includes(emp.id)
        );
        store.commit("notifications/setSelectedEmployees", {
          notificationId: props.notificationId,
          employees: selected,
        });
      },
    });

    const filterMethod = (
      query: string,
      item: Record<string, any>
    ): boolean => {
      if (typeof item.label === "string") {
        return item.label.toLowerCase().includes(query.toLowerCase());
      }
      return false;
    };

    const goToNextStep = () => {
      emit("next");
    };

    const goToPreviousStep = () => {
      emit("previous");
    };

    onMounted(async () => {
      await store.dispatch("notifications/fetchInitialNotifications");
      await store.dispatch(
        "notifications/fetchEmployees",
        props.notificationId
      );
    });

    return {
      transformedEmployees,
      selectedEmployeeKeys,
      goToNextStep,
      goToPreviousStep,
      filterMethod,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/step1.scss";
</style>
