import { ref, computed } from "vue";
import { useStore } from "vuex";

export default function useTextField(notificationId: string) {
  const store = useStore();
  const variablesPickerShow = ref<boolean>(false);
  const massageInputRef = ref<HTMLTextAreaElement | null>(null);

  const notificationText = computed({
    get: () => {
      const notification =
        store.getters["notifications/getNotification"](notificationId);
      return notification ? notification.data.notificationText : "";
    },
    set: (newText) => {
      store.commit("notifications/updateNotificationText", {
        notificationId,
        text: newText,
      });
    },
  });

  const currentInput = (): HTMLTextAreaElement | null => {
    if (massageInputRef.value) {
      return massageInputRef.value.querySelector(`textarea`);
    }
    return null;
  };

  const insertTextAtCursor = (
    textArea: HTMLTextAreaElement,
    insertText: string,
    cursorOffset = 0
  ) => {
    const { selectionStart: start, selectionEnd: end, value } = textArea;

    const beforeCursor = value.substring(0, start);
    const afterCursor = value.substring(end);

    textArea.value = `${beforeCursor}${insertText}${afterCursor}`;
    const newCursorPos = start + cursorOffset;

    // Устанавливаем фокус и перемещаем курсор
    textArea.focus();
    textArea.setSelectionRange(newCursorPos, newCursorPos);
  };

  const pushBBCodeCustom = (openTag: string, closeTag: string) => {
    const textArea = currentInput();
    if (!textArea) return;

    let selectedText = textArea.value.substring(
      textArea.selectionStart,
      textArea.selectionEnd
    );

    if (closeTag === "</r>") {
      selectedText = "";
    }

    const insertText = `${openTag}${selectedText}${closeTag}`;
    insertTextAtCursor(
      textArea,
      insertText,
      textArea.selectionStart + openTag.length + selectedText.length
    );

    notificationText.value = textArea.value;
  };

  const insertVariable = (variable: string) => {
    const textArea = currentInput();
    if (!textArea) return;

    insertTextAtCursor(
      textArea,
      variable,
      textArea.selectionStart + variable.length
    );

    notificationText.value = textArea.value;
  };

  const toggleVariablesPicker = () => {
    variablesPickerShow.value = !variablesPickerShow.value;
  };

  return {
    text: notificationText,
    variablesPickerShow,
    massageInputRef,
    toggleVariablesPicker,
    pushBBCodeCustom,
    insertVariable,
  };
}
