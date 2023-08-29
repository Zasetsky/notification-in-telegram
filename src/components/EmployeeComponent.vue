<template>
  <div class="employee-component">
    <div class="employee-component__field">
      <label for="firstName" class="employee-component__label">Имя</label>
      <el-input
        id="firstName"
        v-model="firstName"
        placeholder="Имя"
        class="employee-component__input"
      ></el-input>
    </div>
    <div class="employee-component__field">
      <label for="lastName" class="employee-component__label"
        >ID в Telegram</label
      >
      <el-input
        id="lastName"
        v-model="lastName"
        placeholder="Фамилия"
        class="employee-component__input"
      ></el-input>
    </div>
    <div class="employee-component__field">
      <label for="selectedEmployee" class="employee-component__label"
        >Пользователь amoCRM</label
      >
      <el-select
        id="selectedEmployee"
        v-model="selectedEmployee"
        placeholder="Выберите сотрудника"
        class="employee-component__select"
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useEmployees } from "@/composables/useEmployees";

export default defineComponent({
  name: "EmployeeComponent",
  setup() {
    const { firstName, lastName, employees, selectedEmployee } = useEmployees();
    return {
      firstName,
      lastName,
      employees,
      selectedEmployee,
    };
  },
});
</script>

<style lang="scss" scoped>
.employee-component {
  display: flex;

  &__field {
    width: 100%;
    margin: 0 14px;
  }

  &__label {
    font-weight: bold;
    margin-bottom: 10px;
  }

  &__input,
  &__select {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
