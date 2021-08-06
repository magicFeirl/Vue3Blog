<template>
  <div class="_container my-4">
    <!-- 左侧博客信息 -->
    <side-card
      :tag_count="tag_count"
      name="极简博客"
      :article_count="article_count"
    ></side-card>
    <!-- 文章列表卡片 -->
    <article-list>
      <article-card
        v-for="article in articles"
        :key="article.id"
        :article="article"
      ></article-card>
    </article-list>
  </div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard";
import ArticleList from "@/components/ArticleList";
import SideCard from "@/components/SideCard";
import { ref, onMounted } from "vue";
import useMessageBox from "@/hooks/useMessageBox";

import api from "@/api/article";
import tag_api from "@/api/tag";

export default {
  components: {
    ArticleCard,
    ArticleList,
    SideCard,
  },
  setup() {
    const articles = ref([]);
    const tag_count = ref(0);
    const article_count = ref(0);

    // 这里后序会加上分页
    const getAllArticles = () => {
      api
        .getAllArticles()
        .then(({ data }) => {
          // 倒序显示（新文章先显示）
          article_count.value = data.count;
          articles.value = data.data.reverse();
        })
        .catch(() => {
          useMessageBox("获取文章列表出错", "error");
        });
    };

    onMounted(() => {
      getAllArticles();
      tag_api.getTagCount().then(({ data }) => {
        tag_count.value = data.count;
      });
    });

    return {
      tag_count,
      article_count,
      articles,
    };
  },
};
</script>

<style scoped>
._container {
  display: grid;
  grid-template-columns: 2fr 8fr;
}
</style>
