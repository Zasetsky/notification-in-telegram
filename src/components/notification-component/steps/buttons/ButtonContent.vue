<template>
  <div class="button-content">
    <div class="button-content__inputs-wrapper">
      <el-input
        v-model="inputValueModel"
        class="button-content__input"
        placeholder="Введите что-то"
      ></el-input>
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
    <el-checkbox v-model="deleteMessage">
      Удалить сообщение из чата после нажатия на кнопку
    </el-checkbox>
    <div class="button-content__responsible-checkboxes">
      <p>Сменить ответственного</p>
      <el-checkbox v-model="changeResponsibleDeal">В сделке</el-checkbox>
      <el-checkbox v-model="changeResponsibleTask">В задаче</el-checkbox>
      <el-checkbox v-model="changeResponsibleCompany">В компании</el-checkbox>
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

<style lang="scss">
.button-content {
  padding: 20px;
  &__inputs-wrapper {
    display: flex;
    width: 100%;
  }

  .el-input {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
    margin: 0 10px;
  }

  &__responsible-checkboxes {
    .el-checkbox {
      margin-left: 5px;
    }

    p {
      color: var(--el-text-color-primary);
      margin: 0;
      margin-top: 20px;
    }
  }
}
</style>
