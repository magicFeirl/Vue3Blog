<template>
  <div class="container mx-auto prose">
    <h1>{{ a.title }}</h1>
    <DefinedMarkdown :source="a.content"></DefinedMarkdown>
  </div>
</template>

<script>
import { fakeArticleList } from "@/fakeDB";
import DefinedMarkdown from "@/components/DefinedMarkdown";

export default {
  components: {
    DefinedMarkdown,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    console.log(fakeArticleList);
    return { a: fakeArticleList[this.id] };
  },
};
</script>
