<template>
  <div class="text-field">
    <div ref="massageInputRef" class="text-field__massageInput">
      <TextFieldTools
        @toggleVariablesPicker="toggleVariablesPicker"
        @pushChooseValue="pushBBCodeCustom"
      />
      <el-input
        ref="massageInput"
        :max="1000"
        resize="vertical"
        :autofocus="true"
        type="textarea"
        placeholder="Введите текст оповещения..."
        v-model="text"
        maxlength="1000"
        show-word-limit
        :autosize="{ minRows: 6 }"
      >
      </el-input>
      <variables-picker
        @past="(v: string) => insertVariable(v)"
        :show="variablesPickerShow"
        :account-id="19769626"
        :app-name="'rkrs_autoname_lead'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElInput } from "element-plus";
import TextFieldTools from "./TextFieldTools.vue";
import VariablesPicker from "./VariablesPicker.vue";

import useTextField from "@/composables/notification/useTextField";

import "element-plus/es/components/input/style/css";

export default defineComponent({
  components: {
    VariablesPicker,
    ElInput,
    TextFieldTools,
  },

  props: {
    notificationId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const {
      text,
      variablesPickerShow,
      massageInputRef,
      toggleVariablesPicker,
      pushBBCodeCustom,
      insertVariable,
    } = useTextField(props.notificationId);

    return {
      text,
      variablesPickerShow,
      massageInputRef,
      toggleVariablesPicker,
      pushBBCodeCustom,
      insertVariable,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/text-field.scss";
</style>
