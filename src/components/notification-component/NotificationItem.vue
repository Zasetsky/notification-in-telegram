<template>
  <div
    class="notification-item"
    :class="{ hover: isHovering }"
    @mouseover="isHovering = true"
    @mouseout="isHovering = false"
    @click="showDialog"
  >
    <span :class="{ hover: isHovering }">{{ data.name }}</span>
    <div class="notification-item__icons-wrapper">
      <copy_icon
        @click.stop="cloneAndSaveNotification"
        style="margin-right: 24px"
      />
      <delete_icon @click.stop="deleteNotification" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { Notification } from "./notificationTypes";
import { useStore } from "vuex";

import { copy_icon, delete_icon } from "@/assets/icons/index";

export default defineComponent({
  components: {
    copy_icon,
    delete_icon,
  },

  props: {
    data: {
      type: Object as PropType<Notification>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const isHovering = ref(false);

    const showDialog = () => {
      emit("show-dialog", props.data.id);
    };

    const cloneAndSaveNotification = () => {
      store.dispatch("notifications/copyAndSaveNotification", props.data.id);
    };

    const deleteNotification = () => {
      store.dispatch("notifications/removeNotificationItem", props.data.id);
    };

    return {
      isHovering,
      showDialog,
      cloneAndSaveNotification,
      deleteNotification,
    };
  },
});
</script>

<style lang="scss">
.notification-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 16px;
  border-bottom: 1px solid var(--el-border-color-lighter);
  cursor: pointer;

  &.hover {
    background-color: var(--el-fill-color-light);
  }

  span {
    color: var(--el-color-primary);
    font-size: 14px;
    height: min-content;

    &.hover {
      border-bottom: 1px solid var(--el-color-primary);
    }
  }

  &__icons-wrapper {
    display: flex;
  }
}
</style>
