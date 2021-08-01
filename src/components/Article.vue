<template>
  <div class="container mx-auto prose" v-if="!!data">
    <h1>{{ data.title }}</h1>
    <DefinedMarkdown :source="data.content"></DefinedMarkdown>
  </div>
</template>

<script>
import DefinedMarkdown from "@/components/DefinedMarkdown";
import { useStore } from "vuex";
import { ref } from "vue";

import useMessageBox from "@/hooks/useMessageBox";

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
  setup(props) {
    const store = useStore();
    const data = ref({});

    store
      .dispatch("getArticle", props.id)
      .then(({ data: _data }) => {
        data.value = _data.data;
        console.log(data);
      })
      .catch(() => {
        useMessageBox("请求文章出错", "error");
      });

    return {
      data,
    };
  },
};
</script>
