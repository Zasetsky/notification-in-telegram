<template>
  <div class="text-field__tools">
    <div title="Жирный" @click="toolBold" class="tool toolHover">
      <bold_icon />
    </div>

    <div title="Курсив" @click="toolItalic" class="tool toolHover">
      <italic_icon />
    </div>

    <div title="Подчёркивание" @click="toolUnderlined" class="tool toolHover">
      <underline_icon />
    </div>

    <div title="Зачёркивание" @click="toolCrossed" class="tool toolHover">
      <crossout_icon />
    </div>

    <div title="Моноширинный" @click="toolMono" class="tool toolHover">
      <mono_icon />
    </div>
    <div
      title="Переменные"
      @click="toggleVariablesPicker"
      class="tool toolHover"
    >
      <variables_icon />
    </div>

    <div
      @click="pushRandomValue"
      title="Рандомное значение"
      class="tool toolHover"
    >
      <random_icon />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  random_icon,
  variables_icon,
  bold_icon,
  crossout_icon,
  italic_icon,
  mono_icon,
  underline_icon,
} from "@/assets/icons/index";

export default defineComponent({
  components: {
    random_icon,
    variables_icon,
    bold_icon,
    crossout_icon,
    italic_icon,
    mono_icon,
    underline_icon,
  },
  setup(_, { emit }) {
    const toggleVariablesPicker = () => {
      emit("toggleVariablesPicker");
    };

    const pushRandomValue = () => {
      emit("pushChooseValue", `<r>первый вариант|второй вариант`, `</r>`);
    };

    const toolBold = () => {
      emit("pushChooseValue", `<b>`, `</b>`);
    };

    const toolItalic = () => {
      emit("pushChooseValue", `<i>`, `</i>`);
    };

    const toolUnderlined = () => {
      emit("pushChooseValue", `<u>`, `</u>`);
    };

    const toolCrossed = () => {
      emit("pushChooseValue", `<s>`, `</s>`);
    };

    const toolMono = () => {
      emit("pushChooseValue", `<pre>`, `</pre>`);
    };

    return {
      toggleVariablesPicker,
      pushRandomValue,
      toolBold,
      toolItalic,
      toolUnderlined,
      toolCrossed,
      toolMono,
    };
  },
});
</script>
