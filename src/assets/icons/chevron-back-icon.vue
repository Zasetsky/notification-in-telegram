<template>
  <div style="display: flex; margin-right: 8px">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M11.25 14.1667L7.5 10.4167L11.25 6.66675"
        :stroke="hover ? 'var(--el-color-white)' : 'var(--el-color-primary)'"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    hover: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
