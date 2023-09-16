<template>
  <div class="buttons-card">
    <el-tabs
      v-model="ActiveButtonTab"
      type="card"
      editable
      @edit="handleTabsEdit"
    >
      <el-tab-pane
        v-for="item in buttons"
        :key="item.id"
        :label="`Кнопка ${item.id}`"
        :name="item.id"
      >
        <ButtonContent :buttonId="item.id" :notificationId="notificationId" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ButtonContent from "./ButtonContent.vue";
import { useButtonsCard } from "@/composables/notification/useButtonsCard";
import { Button } from "../../notificationTypes";

import { ElTabs, ElTabPane } from "element-plus";
import "element-plus/es/components/tabs/style/css";
import "element-plus/es/components/tab-pane/style/css";
import "element-plus/es/components/button/style/css";

export default defineComponent({
  components: {
    ElTabs,
    ElTabPane,
    ButtonContent,
  },

  props: {
    notificationId: {
      type: String,
      required: true,
    },

    buttons: {
      type: Array as PropType<Button[]>,
      required: true,
    },
  },

  setup(props) {
    const { ActiveButtonTab, handleTabsEdit } = useButtonsCard(
      props.notificationId,
      props.buttons
    );

    return {
      ActiveButtonTab,
      handleTabsEdit,
    };
  },
});
</script>

<style lang="scss">
.buttons-card {
  .el-tabs__header {
    margin: 0;
  }
  .el-tabs__content {
    border: 1px solid var(--el-border-color-light);
    width: 100%;
    border-top: none;
  }

  .el-tabs__new-tab {
    border-radius: 4px;
    border: 1px solid var(--el-color-primary-light-7);
    background-color: var(--el-color-primary-light-9);

    .el-icon {
      color: var(--el-color-primary);
    }

    &:hover {
      color: var(--el-color-white);
      background-color: var(--el-color-primary);

      .el-icon {
        color: var(--el-color-white);
      }
    }
  }
}
</style>
