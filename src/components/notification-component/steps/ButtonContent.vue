<template>
  <div class="button-content">
    <div class="button-content__inputs-wrapper">
      <el-input
        v-model="inputValueModel"
        class="button-content__input"
        placeholder="Введите что-то"
      ></el-input>
      <div class="button-content__link-wrapper">
        <el-cascader
          v-model="cascaderValueModel"
          :options="cascaderOptions"
          :show-all-levels="isNotLinkValue"
          class="button-content__cascader button-content__cascader--single"
          :props="{ expandTrigger: 'hover' }"
          placeholder="Выберите сценарий"
        ></el-cascader>
        <el-input
          v-if="!isNotLinkValue"
          v-model="linkValueModel"
          class="button-content__input link"
          placeholder="Введите ссылку"
        >
        </el-input>
      </div>
    </div>
    <el-checkbox v-model="deleteMessage"> Удалить сообщение </el-checkbox>
    <div class="button-content__responsible-checkboxes">
      <p>Сменить ответственного</p>
      <el-checkbox v-model="changeResponsibleDeal">Сделка</el-checkbox>
      <el-checkbox v-model="changeResponsibleTask">Задача</el-checkbox>
      <el-checkbox v-model="changeResponsibleCompany">Компания</el-checkbox>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElInput, ElCascader, ElCheckbox } from "element-plus";
import { useButtonContent } from "@/composables/notification/useButtonContent";

import "element-plus/es/components/input/style/css";
import "element-plus/es/components/cascader/style/css";
import "element-plus/es/components/checkbox/style/css";

export default defineComponent({
  components: {
    ElInput,
    ElCascader,
    ElCheckbox,
  },

  props: {
    buttonId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const {
      inputValueModel,
      cascaderOptions,
      cascaderValueModel,
      isNotLinkValue,
      linkValueModel,
      changeResponsibleDeal,
      changeResponsibleTask,
      changeResponsibleCompany,
      deleteMessage,
    } = useButtonContent(props.buttonId);

    return {
      inputValueModel,
      cascaderOptions,
      cascaderValueModel,
      isNotLinkValue,
      linkValueModel,
      changeResponsibleDeal,
      changeResponsibleTask,
      changeResponsibleCompany,
      deleteMessage,
    };
  },
});
</script>

<style lang="scss" scoped>
.button-content {
  &__inputs-wrapper {
    display: flex;
  }

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
}
</style>
