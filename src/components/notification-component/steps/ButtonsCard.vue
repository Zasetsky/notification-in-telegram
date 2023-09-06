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
        :label="item.title"
        :name="item.id"
      >
        <ButtonContent :buttonId="item.id" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElTabs, ElTabPane } from "element-plus";
import ButtonContent from "./ButtonContent.vue";
import { useButtonsCard } from "@/composables/notification/useButtonsCard";

import "element-plus/es/components/tabs/style/css";
import "element-plus/es/components/tab-pane/style/css";
import "element-plus/es/components/button/style/css";

export default defineComponent({
  components: {
    ElTabs,
    ElTabPane,
    ButtonContent,
  },

  setup() {
    const { ActiveButtonTab, buttons, handleTabsEdit, changeTab } =
      useButtonsCard();

    return {
      ActiveButtonTab,
      buttons,
      handleTabsEdit,
      changeTab,
    };
  },
});
</script>

<style lang="scss">
.buttons-card {
  .tab-header {
    display: flex;
    align-items: center;

    .el-button {
      margin-left: 5px;
    }
  }
}
</style>
