<template>
  <div style="margin-right: 8px">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M2.5 5.75H2V6.25V17.5V18H2.5H13.75H14.25V17.5V6.25V5.75H13.75H2.5ZM14.4634 5.53661L14.8169 5.18306L14.4634 5.53661C14.4868 5.56005 14.5 5.59185 14.5 5.625V18.125C14.5 18.1582 14.4868 18.1899 14.4634 18.2134C14.4399 18.2368 14.4082 18.25 14.375 18.25H1.875C1.84185 18.25 1.81005 18.2368 1.78661 18.2134C1.76317 18.1899 1.75 18.1582 1.75 18.125V5.625C1.75 5.59185 1.76317 5.56005 1.78661 5.53661C1.81005 5.51317 1.84185 5.5 1.875 5.5H14.375C14.4082 5.5 14.4399 5.51317 14.4634 5.53661ZM7 2.5V3.25H6.75V1.875C6.75 1.84185 6.76317 1.81005 6.78661 1.78661C6.81005 1.76317 6.84185 1.75 6.875 1.75H18.125C18.1582 1.75 18.1899 1.76317 18.2134 1.78661C18.2368 1.81005 18.25 1.84185 18.25 1.875V15.625C18.25 15.6582 18.2368 15.6899 18.2134 15.7134C18.1899 15.7368 18.1582 15.75 18.125 15.75H16.75V15.5H17.5H18V15V2.5V2H17.5H7.5H7V2.5ZM5.5 13.625H10.75V13.875H5.5V13.625ZM5.5 9.875H10.75V10.125H5.5V9.875Z"
        fill="#909399"
        :stroke="hover ? 'var(--el-color-white)' : 'var(--el-color-primary)'"
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
