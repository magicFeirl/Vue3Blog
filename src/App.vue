<template>
  <div>
    <global-header></global-header>
    <router-view></router-view>
  </div>
</template>

<script>
import GlobalHeader from "@/components/GlobalHeader";
export default {
  components: {
    GlobalHeader,
  },
};
</script>

<style lang="less" scoped></style>
