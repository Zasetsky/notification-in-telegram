<template>
  <div class="rakurs-var">
    <div class="rakurs-var__picker-wrapper" v-if="show">
      <el-row v-loading="loading">
        <div class="rakurs-var__picker">
          <ul>
            <li
              @click.prevent="past(code(item))"
              v-for="(item, index) in fieldsResult"
              :key="index"
            >
              <span class="var" v-html="code(item)"></span>
              - {{ item.name }}
            </li>
          </ul>
        </div>

        <div class="rakurs-var__picker-panel">
          <el-row class="rakurs-var__input-wrapper" :gutter="10">
            <el-col :span="12">
              <el-input
                maxlength="20"
                placeholder="Поиск поля"
                clearable
                v-model="search"
              >
                <template v-slot:prefix>
                  <i class=""></i>
                </template>
              </el-input>
            </el-col>

            <el-col :span="12">
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  ElRow,
  ElCol,
  ElInput,
  ElSelect,
  ElOption,
  ElLoading,
} from "element-plus";

import useVariablesPicker from "@/composables/notification/useVariablesPicker";

import "element-plus/es/components/row/style/css";
import "element-plus/es/components/col/style/css";
import "element-plus/es/components/input/style/css";
import "element-plus/es/components/select/style/css";
import "element-plus/es/components/option/style/css";
import "element-plus/es/components/loading/style/css";

export default defineComponent({
  directives: {
    loading: ElLoading.directive,
  },
  components: {
    ElRow,
    ElCol,
    ElInput,
    ElSelect,
    ElOption,
  },
  props: {
    show: Boolean,
    accountId: [String, Number],
    appName: String,
  },
  setup(props, { emit }) {
    const {
      data,
      loading,
      search,
      modify,
      modifyOptions,
      fieldsResult,
      getData,
      code,
      past,
    } = useVariablesPicker(props, emit);

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

<style lang="scss">
@import "@/assets/styles/variables-picker.scss";
</style>
