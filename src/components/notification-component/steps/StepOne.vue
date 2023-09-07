<template>
  <div class="step-one">
    <div class="step-one__fields-wrapper">
      <el-input
        class="step-one--input"
        placeholder="Введите название сценария"
      />

      <p>Выберите сотрудников, которые будут получать оповещения</p>

      <el-transfer
        v-model="value"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="State Abbreviations"
        :data="data"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ElTransfer, ElInput } from "element-plus";

import "element-plus/es/components/button/style/css";
import "element-plus/es/components/transfer/style/css";
import "element-plus/es/components/input/style/css";

interface Option {
  key: number;
  label: string;
  initial: string;
}

export default defineComponent({
  components: {
    ElTransfer,
    ElInput,
  },

  setup(_, { emit }) {
    const value = ref([]);

    const generateData = () => {
      const data: Option[] = [];
      const states = [
        "California",
        "Illinois",
        "Maryland",
        "Texas",
        "Florida",
        "Colorado",
        "Connecticut ",
      ];
      const initials = ["CA", "IL", "MD", "TX", "FL", "CO", "CT"];
      states.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          initial: initials[index],
        });
      });
      return data;
    };

    const data = ref<Option[]>(generateData());

    const goToNextStep = () => {
      emit("next");
    };

    const goToPreviousStep = () => {
      emit("previous");
    };

    const filterMethod = (query: any, item: any) => {
      return item.initial.toLowerCase().includes(query.toLowerCase());
    };

    return {
      value,
      data,
      goToNextStep,
      goToPreviousStep,
      filterMethod,
      generateData,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/step1.scss";
</style>
