<template>
  <div class="prose">
    <markdown
      :highlight="{ auto: true, inline: true }"
      :anchor="{
        permalink: true,
        permalinkBefore: true,
        permalinkSymbol: '#',
      }"
      :linkify="true"
      :breaks="true"
      :source="source"
    ></markdown>
  </div>
</template>

<script>
import Markdown from "vue3-markdown-it";

export default {
  components: {
    Markdown,
  },
  props: {
    source: {
      type: String,
      required: true,
    },
  },
};
</script>
