<template>
  <div class="button-inputs">
    <el-input
      v-model="inputValueModel"
      class="button-inputs__input"
      placeholder="Введите что-то"
    ></el-input>
    <div class="button-inputs__link-wrapper">
      <el-cascader
        v-model="cascaderValue1Model"
        :options="cascaderOptions1"
        :show-all-levels="isNotLinkValue"
        class="button-inputs__cascader button-inputs__cascader--single"
        :props="{ expandTrigger: 'hover' }"
        placeholder="Выберите сценарий"
      ></el-cascader>
      <el-input
        v-if="!isNotLinkValue"
        v-model="linkValueModel"
        class="button-inputs__input link"
        placeholder="Введите ссылку"
      >
      </el-input>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import { ElInput, ElCascader } from "element-plus";
import { useStore } from "vuex";

import "element-plus/es/components/input/style/css";
import "element-plus/es/components/cascader/style/css";

export default defineComponent({
  props: {
    buttonId: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();

    const cascaderOptions1 = computed(() => store.getters.getCascaderOptions1);
    const cascaderOptions2 = computed(() => store.getters.getCascaderOptions2);

    const inputValueModel = computed({
      get: () => store.getters.getInputValue(props.buttonId),
      set: (value: string) =>
        store.commit("updateInputValue", { id: props.buttonId, value }),
    });

    const linkValueModel = computed({
      get: () => store.getters.getLinkValue(props.buttonId),
      set: (value: string) =>
        store.commit("updateLinkValue", { id: props.buttonId, value }),
    });

    const cascaderValue1Model = computed({
      get: () => store.getters.getCascaderValue(props.buttonId, "cascader1"),
      set: (value: string) =>
        store.commit("updateCascaderValue1", { id: props.buttonId, value }),
    });

    const cascaderValue2Model = computed({
      get: () => store.getters.getCascaderValue(props.buttonId, "cascader2"),
      set: (value: string) =>
        store.commit("updateCascaderValue2", { id: props.buttonId, value }),
    });

    const isNotLinkValue = computed(() => {
      const cascaderValues = cascaderValue1Model.value;
      return cascaderValues ? !cascaderValues.includes("link") : true;
    });

    onMounted(() => {
      store.dispatch("fetchCascaderOptions1");
      store.dispatch("fetchCascaderOptions2");
    });

    return {
      inputValueModel,
      cascaderOptions1,
      cascaderOptions2,
      cascaderValue1Model,
      cascaderValue2Model,
      isNotLinkValue,
      linkValueModel,
    };
  },
});
</script>

<style lang="scss" scoped>
.button-inputs:not(:first-child) {
  margin-top: 10px;
}
.button-inputs {
  display: flex;

  &--drag-and-drop-icon {
    display: flex;
    align-items: center;
    margin-left: 20px;
    height: 32px;
    cursor: grab;
  }

  &__input {
    width: 100%;
    height: 32px;
    margin-left: 10px;
  }

  &__link-wrapper {
    display: flex;
    align-items: baseline;
    width: 100%;
    min-height: 32px;
  }

  &--delete-icon {
    display: flex;
    align-items: center;
    height: 32px;
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>
