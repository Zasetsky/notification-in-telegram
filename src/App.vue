<template>
  <div>
    <NotificationList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NotificationList from "./components/notification-component/NotificationList.vue";

export default defineComponent({
  name: "App",
  components: { NotificationList },
});
</script>

<style lang="scss"></style>
