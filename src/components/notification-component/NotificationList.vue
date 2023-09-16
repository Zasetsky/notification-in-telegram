<template>
  <div class="notification-component">
    <h3 class="notification-component__title">
      Оповещения <span>/ инструкция</span>
    </h3>
    <div class="notification-component__content">
      <NotificationItem
        v-for="notification in filteredNotifications"
        false
        :key="notification.id"
        :data="notification"
        @show-dialog="showAddNotificationDialog"
      />
      <div
        v-if="!filteredNotifications.length"
        class="notification-component__empty"
      >
        <p>Нет ни одного оповещения</p>
        <el-button class="empty-create-btn" @click="createNewNotification">
          + Создать
        </el-button>
      </div>
      <el-button
        class="notification-component--create-btn"
        v-else
        @click="createNewNotification"
      >
        + Создать оповещение
      </el-button>
      <AddNotificationDialog
        :visible="isDialogVisible"
        :notificationId="currentNotificationId"
        @close="isDialogVisible = false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import NotificationItem from "./NotificationItem.vue";
import AddNotificationDialog from "./AddNotificationDialog.vue";
import { generateNewId } from "../../store/modules/notifications";
import { Button, Notification } from "./notificationTypes";
import { useStore } from "vuex";

import { ElButton } from "element-plus";
import "element-plus/es/components/button/style/css";

export default defineComponent({
  components: {
    NotificationItem,
    AddNotificationDialog,
    ElButton,
  },
  setup() {
    const store = useStore();
    const currentNotificationId = ref<string>("");
    const isDialogVisible = ref<boolean>(false);

    const notifications = computed(
      () => store.state.notifications.notificationItem
    );

    const filteredNotifications = computed(() => {
      return notifications.value.filter(
        (n: Notification) => n.isSaved !== false
      );
    });

    const showAddNotificationDialog = (notificationId: string) => {
      currentNotificationId.value = notificationId;
      isDialogVisible.value = true;
    };

    const createNewNotification = () => {
      const newId = generateNewId(store.state.notifications.notificationItem);
      const newButtonId = "1";
      const emptyButton: Button = {
        id: newButtonId,
        inputValue: "",
        cascaderValue: null,
        linkValue: "",
        delete_message: false,
        change_responsible: {
          deal: false,
          task: false,
          company: false,
        },
      };
      const newNotification: Notification = {
        id: newId,
        name: "Новое оповещение",
        isSaved: false,
        data: {
          selectedEmployees: [],
          notificationText: "",
          selectedBot: {
            label: "",
            value: "",
            token: "",
          },
          buttons: [emptyButton],
        },
      };
      store.commit("notifications/addNewNotification", newNotification);
      isDialogVisible.value = true;
      currentNotificationId.value = newId;
    };

    onMounted(async () => {
      await store.dispatch("notifications/fetchInitialNotifications");
    });

    return {
      filteredNotifications,
      currentNotificationId,
      isDialogVisible,
      createNewNotification,
      showAddNotificationDialog,
    };
  },
});
</script>

<style lang="scss">
.notification-component {
  font-family: "Roboto", sans-serif;
  color: var(--el-text-color-primary);

  &__title {
    display: flex;
    align-items: center;
    margin: 0;
    height: 60px;
    font-size: 16px;
    padding: 0px 20px;
    background: var(--el-color-primary-light-9);

    span {
      color: var(--el-color-info);
      margin-left: 8px;
    }
  }

  &__content {
    padding: 30px;
  }

  &__empty {
    p {
      font-size: 14px;
      color: var(--el-text-color-regular);
    }

    .empty-create-btn {
      color: var(--el-color-primary);
      border: none;
      background: var(--el-fill-color-light);

      &:hover {
        background: var(--el-color-primary);
        color: var(--el-color-white);
      }
    }
  }

  &--create-btn {
    float: right;
    margin-top: 30px;
    background: var(--el-color-primary);
    color: var(--el-color-white);

    &:hover {
      background: var(--el-color-primary-light-3);
      color: var(--el-color-white);
    }
  }
}
</style>
