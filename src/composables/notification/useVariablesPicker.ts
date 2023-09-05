import { ref, watch, computed } from "vue";
import axios from "axios";

interface Item {
  name: string;
  id: number;
  category_type: string;
}

interface ModifyOption {
  id: string;
  name: string;
}

interface PropsType {
  show: boolean;
  accountId?: string | number;
  appName?: string;
}

interface EmitType {
  (eventName: string, ...args: string[]): void;
}

export default function useVariablesPicker(props: PropsType, emit: EmitType) {
  const data = ref<Item[]>([]);
  const loading = ref<boolean>(true);
  const search = ref<string>("");
  const modify = ref<string>("");
  const modifyOptions = ref<ModifyOption[]>([]);

  const fieldsResult = computed(() => {
    if (data.value.length) {
      return data.value.filter((item) =>
        item.name.toLowerCase().includes(search.value.toLowerCase())
      );
    }
    return [];
  });

  watch(
    () => props.show,
    async (val) => {
      if (val && !data.value.length) {
        await getData();
      }
    }
  );

  const getData = async () => {
    loading.value = true;
    try {
      const res = await axios.post("https://ssd.rkrs.ru/widget/get/var", {
        accountId: props.accountId,
        appName: props.appName,
      });
      data.value = res.data.data;
      modifyOptions.value = res.data.modify;
    } finally {
      loading.value = false;
    }
  };

  const code = (item: Item) => {
    const mod = modify.value ? `|${modify.value}` : ``;
    return `{{${item.category_type}|${item.id}${mod}}}`;
  };

  const past = (code: string) => {
    emit("past", code);
  };

  return {
    data,
    loading,
    search,
    modify,
    modifyOptions,
    fieldsResult,
    getData,
    code,
    past,
  };
}
