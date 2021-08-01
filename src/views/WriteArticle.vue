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
import { useStore } from "vuex";
import DefinedMarkdown from "@/components/DefinedMarkdown";
import useMessageBox from "@/hooks/useMessageBox";

// import qs from "qs";

export default {
  components: {
    DefinedMarkdown,
  },
  setup() {
    const title = ref("");
    const content = ref("");
    const preview = ref(false);

    const router = useRouter();
    const store = useStore();

    const postArticle = () => {
      store
        .dispatch("postArticle", {
          title: title.value,
          content: content.value,
          description: "这是一篇很diao的文章，还不快看！！11",
        })
        .then(({ data }) => {
          console.log(data);
        })
        .catch(() => {
          useMessageBox("Create article failed", "error");
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

<style scoped></style>
