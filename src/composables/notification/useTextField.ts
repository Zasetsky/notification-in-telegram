import { ref } from "vue";

export default function useTextField() {
  const text = ref<string>("");
  const variablesPickerShow = ref<boolean>(false);
  const massageInputRef = ref<HTMLTextAreaElement | null>(null);

  const currentInput = (): HTMLTextAreaElement | null => {
    if (massageInputRef.value) {
      return massageInputRef.value.querySelector(`textarea`);
    }
    return null;
  };

  const pushBBCodeCustom = (openTag: string, closeTag: string) => {
    const textArea = currentInput();
    if (!textArea) return;

    const { selectionStart: start, selectionEnd: end, value } = textArea;

    const beforeCursor = value.substring(0, start);
    const afterCursor = value.substring(end);

    textArea.value = `${beforeCursor}${openTag}${closeTag}${afterCursor}`;
    text.value = textArea.value;

    const newCursorPos = start + openTag.length;
    textArea.focus();
    textArea.setSelectionRange(newCursorPos, newCursorPos);
  };

  const insertVariable = (variable: string) => {
    const textArea = currentInput();
    if (!textArea) return;

    const { selectionStart: start, selectionEnd: end, value } = textArea;

    const beforeCursor = value.substring(0, start);
    const afterCursor = value.substring(end);

    textArea.value = `${beforeCursor}${variable}${afterCursor}`;
    text.value = textArea.value;

    const closeBracePos = variable.lastIndexOf("}}");
    if (closeBracePos !== -1) {
      const newCursorPos = start + closeBracePos;
      textArea.focus();
      textArea.setSelectionRange(newCursorPos, newCursorPos);
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
    insertVariable,
  };
}
