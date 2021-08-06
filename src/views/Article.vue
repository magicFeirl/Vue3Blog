<template>
  <div class="container mx-auto prose" v-if="loaded">
    <!-- 标题 -->
    <h1>{{ data.title }}</h1>
    <!-- 文章信息区域 -->
    <div class="flex justify-between">
      <!-- tag -->
      <div class="flex space-x-2">
        <tag class="text-sm " v-for="tag in data.tags" :key="tag.tag_id">
          <router-link :to="`/tag/${tag.tag_id}`">{{
            tag.tag_name
          }}</router-link>
        </tag>
      </div>
      <div class="flex-grow"></div>
      <!-- 编辑、删除文章操作 -->
      <div class="flex space-x-2">
        <router-link :to="`/edit?id=${data.id}`" class="second-text"
          >编辑文章</router-link
        >
        <span @click="show = true" to="/" class="second-text">删除文章</span>
      </div>
    </div>
    <!-- 文章内容 md 渲染 -->
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
import { useRouter } from "vue-router";
import { ref } from "vue";
import Dialog from "@/components/Dialog";
import Tag from "@/components/Tag";
import useMessageBox from "@/hooks/useMessageBox";

import api from "@/api/article";

export default {
  components: {
    Dialog,
    DefinedMarkdown,
    Tag,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const data = ref({
      title: "",
      content: "",
      id: "",
      tags: [],
    });

    const loaded = ref(false);

    api
      .getArticle(props.id)
      .then(({ data: _data }) => {
        data.value = _data.data;
        loaded.value = true;
      })
      .catch(() => {
        useMessageBox("请求文章出错", "error");
      });

    const show = ref(false);
    const router = useRouter();

    const deleteArticle = () => {
      api
        .deleteArticle(data.value.id)
        .then(() => {
          useMessageBox("删除文章成功");
        })
        .catch(() => {
          useMessageBox("删除文章失败", "error");
        });

      router.replace("/");
    };

    const getArticleTags = () => {
      api.getArticleTags(props.id).then(({ data: _data }) => {
        data.value.tags = _data.data;
      });
    };

    getArticleTags();

    return {
      data,
      show,
      deleteArticle,
      loaded,
    };
  },
};
</script>

<style scoped>
.second-text {
  @apply text-gray-500 text-sm underline hover:text-black cursor-pointer;
}
</style>
