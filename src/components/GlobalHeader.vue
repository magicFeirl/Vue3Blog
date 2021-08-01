<template>
  <div
    class="sticky z-20 top-0 flex justify-between items-center h-12 bg-white shadow-md mb-4 px-8"
  >
    <router-link to="/">极简博客</router-link>
    <div class="flex-grow"></div>
    <div class="flex space-x-2">
      <div v-if="isLogin" class="flex space-x-2">
        <router-link to="/edit">写文章</router-link>
        <router-link to="/" class="hover:text-red-600" @click="logout"
          >注销</router-link
        >
      </div>
      <router-link to="/login" v-else>登录</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["isLogin"]),
  },
  methods: {
    ...mapMutations(["logout"]),
  },
};
</script>

<style lang="less" scoped></style>
