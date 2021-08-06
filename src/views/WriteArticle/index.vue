<template>
  <div class="container mx-auto prose-sm">
    <!-- 上方编辑按钮 -->
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

    <!-- 下方文章输入部分 -->
    <div class="flex flex-col" v-if="!preview">
      <!-- 标题 -->
      <validation-input
        v-model="title"
        class="edit"
        placeholder="文章标题"
        :rules="[{ message: '请输入标题', type: 'required' }]"
      />
      <!-- 添加 tag -->
      <div class="mb-4 mt-3 text-sm space-x-2 flex">
        <tag
          v-for="(tag, idx) in tag_list"
          :key="tag"
          @dblclick="editTag(idx, tag)"
        >
          <editable
            class="inline min-w-4 outline-none border-none"
            :edit="isEditingCurrentTag(idx)"
            v-model="currentEditingTag"
            @blur="endEditTag"
            @keyup.enter="endEditTag"
            >{{ tag }}</editable
          >
        </tag>
        <tag @click.prevent="addTag">点我添加标签</tag>
      </div>
      <!-- 内容 -->
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
    <div v-else>
      <h1>{{ title || "无标题" }}</h1>
      <DefinedMarkdown :source="content" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import DefinedMarkdown from "@/components/DefinedMarkdown";
import useMessageBox from "@/hooks/useMessageBox";
import ValidationInput from "@/components/ValidationInput";
import Tag from "@/components/Tag";
import Editable from "@/components/Editable";

import api from "@/api/article.js";

import { useTagOptionHook } from "./hooks";

export default {
  props: {
    id: [String, Number],
  },
  components: {
    DefinedMarkdown,
    ValidationInput,
    Tag,
    Editable,
  },
  setup(props) {
    const title = ref("");
    const content = ref("");
    const preview = ref(false);

    const tagOptions = useTagOptionHook();
    const router = useRouter();

    const createArticle = (articleData) => {
      api.postArticle(articleData).catch(() => {
        useMessageBox("Create article failed", "error");
      });
    };

    const updateArticle = (id, articleData) => {
      api.updateArticle({ id: id, formData: articleData }).catch((e) => {
        console.log("update article error", e);
        useMessageBox("Update article failed", "error");
      });
    };

    const postArticle = () => {
      const _title = title.value;
      const _content = content.value;

      if (!_title.trim() || !_content.trim()) {
        useMessageBox("请输入必填项", "error");
        return;
      }

      const articleData = {
        title: _title,
        content: _content,
        description: "这是文章预览啦啦啦啦",
      };

      let tag_list = tagOptions.tag_list;
      if (!props.id) {
        createArticle({ tags: tag_list.value, ...articleData });
      } else {
        updateArticle(props.id, articleData);
      }

      router.push("/");
    };

    onMounted(() => {
      if (props.id) {
        api.getArticle(props.id).then(({ data }) => {
          title.value = data.data.title;
          content.value = data.data.content;
        });
      }
    });

    // 判断是否是编辑文章，显示对应文本
    const page_title = props.id ? "更新文章" : "发布文章";
    const page_post_button = page_title;

    return {
      postArticle,
      ...tagOptions,
      preview,
      title,
      content,
      page_title,
      page_post_button,
    };
  },
};
</script>

<style scoped></style>
