<template>
  <div class="container mx-auto prose-sm">
    <div class="flex justify-between items-center">
      <h2>写文章</h2>
      <div class="flex-grow"></div>
      <div class="flex space-x-1">
        <a href="#" @click.prevent="preview = !preview" class="btn btn-red">
          <span v-if="!preview">预览文章</span>
          <span v-else>编辑文章</span>
        </a>
        <a href="#" class="btn btn-red" @click.prevent="postArticle"
          >发布文章</a
        >
      </div>
    </div>

    <div class="flex flex-col" v-if="!preview">
      <input v-model.lazy="title" class="edit mb-2" placeholder="文章标题" />
      <textarea
        v-model.lazy="content"
        rows="15"
        class="edit"
        autofocus
        v-model="content"
        placeholder="输入文章内容，支持 markdown"
      />
    </div>
    <DefinedMarkdown v-else :source="content" />
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import DefinedMarkdown from "@/components/DefinedMarkdown";
import { fakeArticleList } from "@/fakeDB";

export default {
  components: {
    DefinedMarkdown,
  },
  setup() {
    const title = ref("");
    const content = ref("");
    const preview = ref(false);

    const router = useRouter();

    const postArticle = () => {
      fakeArticleList.push({
        title: title.value,
        content: content.value,
        pubtime: "2021年8月1日12:00:12",
        id: fakeArticleList.length,
      });

      router.push("/");
    };

    return {
      preview,
      title,
      content,
      postArticle,
    };
  },
};
</script>

<style scoped>
.edit {
  @apply w-full outline-none text-lg border-none bg-gray-100 p-2 rounded;
}

.btn {
  @apply py-1 px-2 rounded;
}

.btn-red {
  @apply hover:bg-red-700 bg-red-500 text-white;
}
</style>
