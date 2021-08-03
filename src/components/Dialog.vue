<template>
  <teleport to="body">
    <div
      @click="$emit('cancel-dialog')"
      v-if="show"
      class="w-full h-full z-50 top-0 absolute bg-opacity-25 bg-black flex justify-center items-center"
    >
      <div
        @click.stop=""
        class="w-1/4 p-4 bg-white rounded flex flex-col"
      >
        <div class="text-gray-400 text-sm">
          <slot name="title">
            提示
          </slot>
        </div>
        <div class="flex-grow mt-1 mb-2">
          <slot name="content"></slot>
        </div>
        <div class="flex justify-end space-x-3">
          <div @click="$emit('cancel-dialog')">
            <slot name="options">
              <div class="btn btn-red text-sm">Cancel</div>
            </slot>
          </div>
          <div @click="$emit('confirm-dialog')">
            <slot name="options">
              <div class="btn btn-blue text-sm">Confirm</div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  emits: ["cancel-dialog", "confirm-dialog"],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
