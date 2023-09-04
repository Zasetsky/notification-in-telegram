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
        placeholder="Введите название сделки..."
        v-model="text"
        maxlength="1000"
        show-word-limit
        :autosize="{ minRows: 6 }"
      >
      </el-input>
      <variables-picker
        @past="(v: string) => pushBBCodeCustom(v)"
        :show="variablesPickerShow"
        :account-id="19769626"
        :app-name="'rkrs_autoname_lead'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ElInput } from "element-plus";
import TextFieldTools from "./TextFieldTools.vue";
import VariablesPicker from "./VariablesPicker.vue";

import "element-plus/es/components/input/style/css";

export default defineComponent({
  components: {
    VariablesPicker,
    ElInput,
    TextFieldTools,
  },
  setup() {
    const text = ref<string>("");
    const variablesPickerShow = ref<boolean>(false);

    const massageInputRef = ref<HTMLTextAreaElement | null>(null);

    const currentInput = (): HTMLTextAreaElement | null => {
      if (massageInputRef.value) {
        return massageInputRef.value.querySelector(`textarea`);
      }
      return null;
    };

    const pushBBCodeCustom = (openTag: string) => {
      let textArea = currentInput();
      if (textArea) {
        let len = textArea.value.length;
        let start = textArea.selectionStart;
        let end = textArea.selectionEnd;
        let replacement = openTag;
        textArea.value =
          textArea.value.substring(0, start) +
          replacement +
          textArea.value.substring(end, len);
        text.value = textArea.value;
      }
    };

    const toggleVariablesPicker = () => {
      variablesPickerShow.value = !variablesPickerShow.value;
    };

    return {
      text,
      variablesPickerShow,
      massageInputRef,
      toggleVariablesPicker,
      pushBBCodeCustom,
    };
  },
});
</script>

<style lang="scss">
.text-field {
  &__massageInput {
    position: relative;

    textarea {
      padding-top: 50px;
    }
    .el-input__count {
      color: var(--el-text-color-secondary);
    }
  }

  &__tools {
    position: absolute;
    top: 1px;
    left: 1px;
    height: 36px;
    z-index: 9;
    background: #fff;
    width: calc(100% - 3px);
    border-bottom: 1px solid #bacbce;
    border-radius: 3px 3px 0 0;
    overflow: hidden;

    .tool {
      display: inline-block;
      cursor: pointer;
      width: 36px;
      height: 36px;
    }

    .toolHover:hover {
      background: rgb(232, 238, 239);
    }
  }
}
</style>
