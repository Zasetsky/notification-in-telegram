<template>
  <div>
    <EmployeeComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EmployeeComponent from "./components/employee-component/EmployeeComponent.vue";

export default defineComponent({
  name: "App",
  components: { EmployeeComponent },
});
</script>

<style lang="scss"></style>
