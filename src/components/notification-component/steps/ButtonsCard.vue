<template>
  <div class="buttons-card">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      editable
      @edit="handleTabsEdit"
    >
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="index"
        :label="item.title"
        :name="item.name"
      >
        <ButtonInputs :buttonId="index" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ElTabs, ElTabPane, TabPaneName } from "element-plus";

import "element-plus/es/components/tabs/style/css";
import "element-plus/es/components/tab-pane/style/css";
import "element-plus/es/components/button/style/css";
import ButtonInputs from "./ButtonInputs.vue";

interface EditableTab {
  title: string;
  name: string;
  content: string;
}

export default defineComponent({
  components: {
    ElTabs,
    ElTabPane,
    ButtonInputs,
  },

  setup() {
    const editableTabsValue = ref("1");
    const editableTabs = ref<EditableTab[]>([
      {
        title: "Кнопка 1",
        name: "1",
        content: "Содержимое 1",
      },
    ]);

    const addTab = () => {
      const newTabIndex = editableTabs.value.length + 1;
      const newName = newTabIndex.toString();
      editableTabs.value.push({
        title: `Кнопка ${newTabIndex}`,
        name: newName,
        content: `Содержимое ${newTabIndex}`,
      });
      editableTabsValue.value = newName;
    };

    const handleTabsEdit = (
      paneName: TabPaneName | undefined,
      action: "add" | "remove"
    ) => {
      if (action === "remove" && paneName) {
        removeTab(paneName as string);
      }
      if (action === "add") {
        addTab();
      }
    };

    const removeTab = (targetName: string) => {
      let activeName = editableTabsValue.value;
      if (activeName === targetName) {
        editableTabs.value.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab =
              editableTabs.value[index + 1] || editableTabs.value[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      editableTabsValue.value = activeName;
      editableTabs.value = editableTabs.value.filter(
        (tab) => tab.name !== targetName
      );
    };

    const changeTab = (name: string) => {
      editableTabsValue.value = name;
    };

    return {
      editableTabsValue,
      editableTabs,
      addTab,
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
