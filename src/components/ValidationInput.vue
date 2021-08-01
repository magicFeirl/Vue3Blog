<template>
  <input v-bind="$attrs" class="edit" v-model="val" @input="emitVModel" />
</template>

<script>
import { ref } from "vue";

export default {
  inheritAttrs: false,
  props: {
    modelValue: String,
  },
  emits: ["update:ModelValue"],
  setup(props, context) {
    const val = ref("");

    const emitVModel = () => {
      context.emit("update:ModelValue", val.value);
    };
    
    return {
      val,
      emitVModel,
    };
  },
};
</script>

<style lang="scss" scoped></style>
