<template>
  <div class="container mx-auto flex justify-center items-center mt-20">
    <div
      class="rounded shadow-md w-1/2 p-4 text-center space-y-6 flex flex-col items-center"
    >
      <h1 class="text-lg font-bold text-black">登录到极简博客</h1>
      <ValidationInput
        placeholder="用户名"
        class="edit w-full"
        v-model="username"
        :rules="[{ message: '请输入用户名', type: 'required' }]"
      />
      <ValidationInput
        placeholder="密码"
        class="edit w-full"
        v-model="password"
        :rules="[{ message: '请输入密码', type: 'required' }]"
      />
      <button class="btn btn-red w-20" @click.prevent="login">登录</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import ValidationInput from "@/components/ValidationInput";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useMessageBox from "@/hooks/useMessageBox";

import qs from "qs";

export default {
  components: {
    ValidationInput,
  },
  setup() {
    const username = ref("");
    const password = ref("");
    const store = useStore();
    const router = useRouter();

    const login = async () => {
      const formData = qs.stringify({
        username: username.value,
        password: password.value,
      });

      store
        .dispatch("login", formData)
        .then(() => {
          router.replace("/"); // 回到首页
        })
        .catch(() => {
          useMessageBox("Incorrect username or password", "error");
        });
    };

    return {
      username,
      password,
      login,
    };
  },
};
</script>

<style scoped></style>
