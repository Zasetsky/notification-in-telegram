<template>
  <div class="employee-row">
    <div class="employee-row__grid">
      <div class="employee-row__item">
        <el-input
          v-model="name"
          placeholder="Введите имя"
          :class="{ 'error-border': nameError && !nameFocused }"
          @focus="nameFocused = true"
          @blur="
            checkAndSubmit('name', employee.isNew, employee.id);
            nameFocused = false;
          "
        />
        <span v-if="nameError && !nameFocused" class="error-text"
          >Без имени данные не будут сохранены</span
        >
      </div>
      <div class="employee-row__item">
        <el-input
          v-model="telegramID"
          placeholder="Укажите ID"
          :class="{ 'error-border': telegramIDError && !telegramIDFocused }"
          @focus="telegramIDFocused = true"
          @blur="
            checkAndSubmit('telegramID', employee.isNew, employee.id);
            telegramIDFocused = false;
          "
        />
        <span v-if="telegramIDError && !telegramIDFocused" class="error-text"
          >Без ID данные не будут сохранены</span
        >
      </div>
      <el-select
        v-model="selectedEmployeeID"
        placeholder="Выберите сотрудника"
        class="employee-row__item"
      >
        <el-option
          v-for="employee in employees"
          :key="employee.id"
          :label="employee.name"
          :value="employee.id"
        >
        </el-option>
      </el-select>
    </div>
    <delete_icon class="delete-icon" @click="deleteEmployee(employee.id)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from "vue";
import { useEmployeeRows } from "@/composables/employee/useEmployeeRows";
import { delete_icon } from "@/assets/icons/index";
import { ElInput, ElSelect, ElOption } from "element-plus";
import "element-plus/es/components/input/style/css";
import "element-plus/es/components/select/style/css";
import "element-plus/es/components/option/style/css";
import { SelectedEmployee } from "./employeeTypes";

export default defineComponent({
  name: "EmployeeRow",

  components: {
    delete_icon,
    ElInput,
    ElSelect,
    ElOption,
  },

  props: {
    employee: {
      type: Object as PropType<SelectedEmployee>,
      required: true,
    },
  },

  setup(props) {
    const {
      name,
      telegramID,
      selectedEmployeeID,
      employees,
      nameError,
      telegramIDError,
      nameFocused,
      telegramIDFocused,
      checkAndSubmit,
      deleteEmployee,
    } = useEmployeeRows();

    watch(
      () => props.employee,
      (newVal) => {
        if (newVal) {
          name.value = newVal.name;
          telegramID.value = newVal.telegramID;
          selectedEmployeeID.value = newVal.selectedEmployeeID;
        }
      },
      { immediate: true }
    );

    return {
      name,
      telegramID,
      selectedEmployeeID,
      employees,
      nameError,
      telegramIDError,
      nameFocused,
      telegramIDFocused,
      checkAndSubmit,
      deleteEmployee,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/employee-row.scss";
</style>
