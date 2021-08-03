<template>
  <div class="container mx-auto prose-sm">
    <div class="flex justify-between items-center">
      <h2>{{ page_title }}</h2>
      <div class="flex-grow"></div>
      <div class="flex space-x-1">
        <a href="#" @click.prevent="preview = !preview" class="btn btn-red">
          <span v-if="!preview">预览文章</span>
          <span v-else>编辑文章</span>
        </a>
        <a href="#" class="btn btn-red" @click.prevent="postArticle">{{
          page_post_button
        }}</a>
      </div>
    </div>

    <div class="flex flex-col" v-if="!preview">
      <validation-input
        v-model="title"
        class="edit"
        placeholder="文章标题"
        :rules="[{ message: '请输入标题', type: 'required' }]"
      />
      <validation-input
        :rules="[{ message: '请输入内容', type: 'required' }]"
        type="textarea"
        v-model="content"
        rows="15"
        class="edit"
        autofocus
        placeholder="输入文章内容，支持 markdown"
      />
    </div>
    <DefinedMarkdown v-else :source="content" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import DefinedMarkdown from "@/components/DefinedMarkdown";
import useMessageBox from "@/hooks/useMessageBox";
import ValidationInput from "@/components/ValidationInput";

export default {
  props: {
    id: [String, Number],
  },
  components: {
    DefinedMarkdown,
    ValidationInput,
  },
  setup(props) {
    const title = ref("");
    const content = ref("");
    const preview = ref(false);

    const router = useRouter();
    const store = useStore();

    const createArticle = (articleData) => {
      store.dispatch("postArticle", articleData).catch(() => {
        useMessageBox("Create article failed", "error");
      });
    };

    const updateArticle = (id, articleData) => {
      store
        .dispatch("updateArticle", { id: id, formData: articleData })
        .catch((e) => {
          console.log("update article error", e);
          useMessageBox("Update article failed", "error");
        });
    };

    const postArticle = () => {
      const _title = title.value;
      const _content = content.value;

      if (!_title.trim() || !_content.trim()) {
        return;
      }

      const articleData = {
        title: _title,
        content: _content,
        description: "这是文章预览啦啦啦啦",
      };

      if (!props.id) {
        createArticle(articleData);
      } else {
        updateArticle(props.id, articleData);
      }

      router.push("/");
    };

    onMounted(() => {
      if (props.id) {
        store.dispatch("getArticle", props.id).then(({ data }) => {
          title.value = data.data.title;
          content.value = data.data.content;
        });
      }
    });

    // 判断是否是编辑文章，显示对应文本
    const page_title = props.id ? "更新文章" : "发布文章";
    const page_post_button = page_title;

    return {
      preview,
      title,
      content,
      postArticle,
      page_title,
      page_post_button,
    };
  },
};
</script>

<style scoped></style>
