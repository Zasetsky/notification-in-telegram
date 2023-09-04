<template>
  <div>
    <!-- <NotificationItem v-for="notification in notifications" :key="notification.id" :data="notification" /> -->
    <el-button @click="showAddNotificationDialog"
      >Добавить уведомление</el-button
    >
    <AddNotificationDialog
      :visible="isDialogVisible"
      @close="isDialogVisible = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// import NotificationItem from './NotificationItem.vue';
import AddNotificationDialog from "./AddNotificationDialog.vue";
import { ElButton } from "element-plus";
import "element-plus/es/components/button/style/css";

export default defineComponent({
  components: {
    // NotificationItem,
    AddNotificationDialog,
    ElButton,
  },
  setup() {
    const notifications = ref([]);
    const isDialogVisible = ref(false);

    const showAddNotificationDialog = () => {
      console.log("Button clicked");
      isDialogVisible.value = true;
    };

    // const addNotification = (newNotification) => {
    //   notifications.value.push(newNotification);
    // };

    return {
      notifications,
      isDialogVisible,
      showAddNotificationDialog,
    };
  },
});
</script>
