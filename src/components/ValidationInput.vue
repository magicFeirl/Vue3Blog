<template>
  <div>
    <input
      v-if="type === 'input'"
      v-bind="$attrs"
      class="edit"
      :class="{ 'border ease-in border-red-600 border-solid': error.error }"
      v-model="val"
      @input="emitVModel"
      @blur="validate"
    />

    <textarea
      v-bind="$attrs"
      class="edit"
      :class="{ 'border ease-in border-red-600 border-solid': error.error }"
      v-model="val"
      @input="emitVModel"
      @blur="validate"
      v-else
    />
    <div class="mt-2 text-sm text-red-600">
      <span v-if="error.error">{{ error.message }}</span>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch } from "vue";

/**
 * rule 验证类型:
 * required -> 不为空
 *
 * rule object:
 * message: '错误提示'
 * type: '验证类型'
 */

export default {
  inheritAttrs: false,
  props: {
    modelValue: String,
    type: {
      type: String,
      default: "input",
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:ModelValue"],
  setup(props, context) {
    const val = ref(props.modelValue || "");

    const emitVModel = () => {
      context.emit("update:ModelValue", val.value);
    };

    watch(
      () => props.modelValue,
      (v) => {
        val.value = v;
      }
    );

    const error = reactive({
      error: false,
      message: "",
    });

    const validate = () => {
      const not_passed = props.rules.every((rule) => {
        error.message = rule.message;
        if (rule.type === "required" && val.value.trim() !== "") {
          return false;
        }
        return true;
      });

      error.error = props.rules.length !== 0 && not_passed;
    };

    return {
      val,
      emitVModel,
      error,
      validate,
    };
  },
};
</script>

<style lang="scss" scoped></style>
