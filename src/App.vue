<template>
  <div>
    <NotificationList />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import NotificationList from "./components/notification-component/NotificationList.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "App",
  components: { NotificationList },

  setup() {
    const store = useStore();

    const accountId = store.getters["globalProps/getAccountId"];
    const appName = store.getters["globalProps/getAppName"];

    onMounted(() => {
      console.log(accountId);
      console.log(appName);
    });
  },
});
</script>

<style lang="scss"></style>
