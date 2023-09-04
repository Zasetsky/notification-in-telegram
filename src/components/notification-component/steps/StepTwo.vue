<template>
  <div class="step-two">
    <TextField />
    <el-button @click="complete">Завершить</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TextField from "./TextField.vue";

export default defineComponent({
  components: {
    TextField,
  },

  setup(_, { emit }) {
    const complete = () => {
      const newData = {};
      emit("complete", newData);
    };

    return {
      complete,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/step2.scss";
</style>
