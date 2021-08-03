<template>
  <div class="container mx-auto prose" v-if="!!data">
    <h1>{{ data.title }}</h1>
    <div class="flex justify-between">
      <div></div>
      <div class="flex-grow"></div>
      <div class="flex space-x-2">
        <router-link
          :to="`/edit?id=${data.id}`"
          class="second-text cursor-pointer"
          >编辑文章</router-link
        >
        <span @click="show = true" to="/" class="second-text cursor-pointer"
          >删除文章</span
        >
      </div>
    </div>
    <DefinedMarkdown :source="data.content"></DefinedMarkdown>
  </div>

  <Dialog
    @cancel-dialog="show = false"
    @confirm-dialog="deleteArticle"
    :show="show"
  >
    <template #content>
      <p>确定删除文章吗？</p>
    </template>
  </Dialog>
</template>

<script>
import DefinedMarkdown from "@/components/DefinedMarkdown";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Dialog from "@/components/Dialog";
import useMessageBox from "@/hooks/useMessageBox";

export default {
  components: {
    Dialog,
    DefinedMarkdown,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const data = ref({
      title: "",
      content: "",
      id: "",
    });

    store
      .dispatch("getArticle", props.id)
      .then(({ data: _data }) => {
        data.value = _data.data;
      })
      .catch(() => {
        useMessageBox("请求文章出错", "error");
      });

    const show = ref(false);
    const router = useRouter();

    const deleteArticle = () => {
      store
        .dispatch("deleteArticle", data.value.id)
        .then(() => {
          useMessageBox("删除文章成功");
        })
        .catch(() => {
          useMessageBox("删除文章失败", "error");
        });

      router.replace("/");
    };

    return {
      data,
      show,
      deleteArticle,
    };
  },
};
</script>

<style scoped>
.second-text {
  @apply text-gray-500 text-sm underline hover:text-black;
}
</style>
