<template>
  <Transition>
    <div class="rakurs-var-picker-wrapper" v-if="show">
      <el-row v-loading="loading">
        <div class="rakurs-var-picker">
          <ul>
            <li
              @click.prevent="past(code(item))"
              v-for="(item, index) in fieldsResult"
              :key="index"
            >
              <span
                class="el-link el-link--primary is-underline"
                v-html="code(item)"
              ></span>
              - {{ item.name }}
            </li>
          </ul>
        </div>

        <div class="rakurs-var-picker-panel">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-input
                maxlength="20"
                placeholder="Поиск поля"
                clearable
                v-model="search"
              >
                <template v-slot:prefix>
                  <i class="el-input__icon el-icon-search"></i>
                </template>
              </el-input>
            </el-col>

            <el-col class="inline-block-select" :span="12">
              <el-select
                v-model="modify"
                placeholder="Не выбранно"
                no-data-text="Не выбранно"
                no-match-text="Не выбранно"
              >
                <el-option
                  v-for="select in modifyOptions"
                  :key="select.id"
                  :label="select.name"
                  :value="select.id"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
      </el-row>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import axios from "axios";
import { ElRow, ElCol, ElInput, ElSelect, ElOption } from "element-plus";
import "element-plus/es/components/row/style/css";
import "element-plus/es/components/col/style/css";
import "element-plus/es/components/input/style/css";
import "element-plus/es/components/select/style/css";
import "element-plus/es/components/option/style/css";

interface Item {
  name: string;
  id: number;
  category_type: string;
}

interface ModifyOption {
  id: string;
  name: string;
}

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ElInput,
    ElSelect,
    ElOption,
  },

  props: {
    show: Boolean,
    fields: Array,
    accountId: [String, Number],
    appName: String,
  },
  setup(props, { emit }) {
    const data = ref<Item[]>([]);
    const loading = ref(true);
    const search = ref("");
    const modify = ref("");
    const modifyOptions = ref<ModifyOption[]>([]);

    const fieldsResult = ref<Item[]>([]);

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
      let mod = modify.value ? `|${modify.value}` : ``;
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
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transition: opacity 0.5s ease;
}

.el-select {
  display: block;
}

.rakurs-var-picker {
  height: 200px;
  overflow-y: scroll;
  border-radius: 4px;
}

.rakurs-var-picker-panel {
  padding: 10px;
}

.rakurs-var-picker-wrapper {
  border: 1px solid #dedede;
}

.rakurs-var-picker ul {
  margin: 0;
  padding: 0;
}

.rakurs-var-picker ul li:hover {
  background: #f4f4f5;
  cursor: pointer;
}

.rakurs-var-picker ul li {
  margin: 0;
  list-style-type: none;
  padding-left: 15px;
}
</style>
