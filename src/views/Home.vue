<template>
  <div class="_container">
    <!-- 左侧作者信息 -->
    <div
      class="ml-10 flex items-center flex-col rounded-md shadow-md p-4 max-h-40 space-y-3"
    >
      <img
        class="rounded-full object-cover h-12 w-12"
        src="../assets/logo.png"
      />
      <div class="font-bold">
        CTRN's Blog
      </div>
      <div class="grid grid-cols-3 w-full text-center">
        <div>
          <div class="text-sm font-bold">10</div>
          <div class="text-xs text-gray-600">文章</div>
        </div>
        <div>
          <div class="text-sm font-bold">10</div>
          <div class="text-xs text-gray-600">文章</div>
        </div>
        <div>
          <div class="text-sm font-bold">10</div>
          <div class="text-xs text-gray-600">文章</div>
        </div>
      </div>
    </div>

    <!-- 文章列表卡片 -->
    <div class="grid grid-cols-1 gap-y-4 px-10">
      <article-card
        v-for="article in articles"
        :key="article.id"
        :article="article"
      ></article-card>
    </div>
  </div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard";
import { useStore } from "vuex";
import { ref } from "vue";
import useMessageBox from "@/hooks/useMessageBox";

export default {
  components: {
    ArticleCard,
  },
  setup() {
    const store = useStore();
    const articles = ref([]);

    const getAllArticles = () => {
      store
        .dispatch("getAllArticles")
        .then(({ data }) => {
          articles.value = data.data;
        })
        .catch(() => {
          useMessageBox("获取文章列表出错", "error");
        });
    };

    getAllArticles();

    return {
      articles,
    };
  },
};
</script>

<style lang="less" scoped>
._container {
  display: grid;
  grid-template-columns: 2fr 8fr;
}
</style>
