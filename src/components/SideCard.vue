<template>
  <div
    class="ml-10 flex items-center flex-col rounded-md shadow-md p-4 max-h-40 space-y-3"
  >
    <img class="rounded-full object-cover h-12 w-12" src="../assets/logo.png" />
    <div class="font-bold">
      {{ name }}
    </div>
    <div class="grid grid-cols-2 w-full text-center">
      <div>
        <div class="text-sm font-bold">{{ tag_count || 0 }}</div>
        <div class="text-xs text-gray-600">标签</div>
      </div>
      <div>
        <div class="text-sm font-bold">{{ article_count || 0 }}</div>
        <div class="text-xs text-gray-600">文章</div>
      </div>
      <!-- <div>
          <div class="text-sm font-bold">10</div>
          <div class="text-xs text-gray-600">文章</div>
        </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    tag_count: Number,
    article_count: Number,
  },
};
</script>

<style lang="scss" scoped></style>
