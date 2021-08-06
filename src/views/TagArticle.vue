<template>
  <div class="container mx-auto">
    <div class="mb-4 px-11">
      <h1 class="text-lg font-bold ">{{ tag_info.tag_name }} 下的全部文章</h1>
      <div class="text-sm text-gray-500">
        Tag 创建于 {{ tag_info.created_at }}
      </div>
    </div>
    <article-list class="">
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

import axios from "@/hooks/useAxios";
import { ref } from "vue";

export default {
  components: {
    ArticleCard,
    ArticleList,
  },
  props: {
    id: [String, Number],
  },
  setup(props) {
    const articles = ref([]);
    const tag_info = ref({
      tag_name: "",
      created_at: "",
    });

    axios
      .get(`/tag/articles?tag_id=${props.id}&pn=1&limit=20`)
      .then(({ data }) => {
        articles.value = data.data;
      });

    axios.get(`/tag?tag_id=${props.id}`).then(({ data }) => {
      tag_info.value.tag_name = data.data.tag_name;
      tag_info.value.created_at = data.data.created_at;
    });

    return {
      articles,
      tag_info,
    };
  },
};
</script>

<style lang="scss" scoped></style>
