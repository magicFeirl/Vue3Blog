<template>
  <div v-if="!edit">
    <slot></slot>
  </div>
  <div v-else>
    <input v-bind="$attrs" v-model="computedText" />
  </div>
</template>

<script>
import { computed, ref } from "vue";
export default {
  inheritAttrs: false,
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    modelValue: String,
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const text = ref(props.modelValue);

    const computedText = computed({
      get() {
        return text.value;
      },
      set(newValue) {
        context.emit("update:modelValue", newValue);
        text.value = newValue;
      },
    });

    return {
      computedText,
    };
  },
};
</script>

<style lang="scss" scoped></style>
