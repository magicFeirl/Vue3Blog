<template>
  <div class="rounded-md shadow-md p-4 flex flex-col justify-between">
    <div>
      <h2 class="text-gray-900 font-bold text-xl">{{ article.title }}</h2>
      <div class="text-gray-300 text-sm">
        {{ article.pubtime }}
      </div>
    </div>
    <p class="text-gray-600 text-justify line-clamp-3 w-full">
      {{ article.content }}
    </p>
    <router-link
      :to="`/article/${article.id}`"
      class="text-gray-300 text-sm text-right block mt-2 hover:text-gray-500"
      >查看更多</router-link
    >
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped></style>
