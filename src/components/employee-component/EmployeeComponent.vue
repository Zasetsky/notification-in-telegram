<template>
  <div class="employee-component">
    <h4 class="employee-component--header">
      Сотрудники <span> / инструкция</span>
    </h4>
    <p class="employee-component--info">
      Сопоставьте менеджеров в amoCRM и Telegram для дальнейшей работы со
      сценариями. Чтобы получить ID в Telegram, запустите бота
      <a href="_ref">rkrs_bot</a>
    </p>
    <div class="employee-component__grid-wrapper">
      <div class="employee-component__grid">
        <span class="employee-component__header-item">Имя</span>
        <span class="employee-component__header-item">ID в Telegram</span>
        <span class="employee-component__header-item">Пользователь amoCRM</span>
      </div>
      <EmployeeRow
        v-for="(employee, index) in selectedEmployees"
        :key="index"
        :employee="employee"
      />
      <el-button type="text" @click="addUser"
        >+ Добавить пользователя</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useEmployees } from "@/composables/employee/useEmployees";
import { ElButton } from "element-plus";
import "element-plus/es/components/button/style/css";
import EmployeeRow from "./EmployeeRow.vue";

export default defineComponent({
  name: "EmployeeComponent",
  components: { ElButton, EmployeeRow },
  setup() {
    const { selectedEmployees, addUser } = useEmployees();

    return {
      selectedEmployees,
      addUser,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/employee-component.scss";
</style>
