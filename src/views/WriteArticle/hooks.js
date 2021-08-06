import {
  ref
} from 'vue'

import useMessageBox from "@/hooks/useMessageBox";

export function useTagOptionHook() {
  const currentEditingTag = ref("");
  const currentEditingTagIdx = ref(-1);
  const tag_list = ref([]);
  const isEditingCurrentTag = (idx) => {
    console.log(currentEditingTagIdx.value, idx)
    return currentEditingTagIdx.value === idx;
  }

  const editTag = (idx, tag) => {
    currentEditingTag.value = tag;
    currentEditingTagIdx.value = idx;
  };

  const endEditTag = () => {
    tag_list.value[currentEditingTagIdx.value] = currentEditingTag.value;
    
    currentEditingTagIdx.value = -1;
    currentEditingTag.value = '';
  }

  const addTag = () => {
    if (tag_list.value.length >= 5) {
      useMessageBox("最多只能添加 5 个标签", "error");
      return;
    }

    if (currentEditingTagIdx.value === -1) {
      tag_list.value.push(currentEditingTag.value);
    }
  };

  return {
    editTag,
    endEditTag,
    addTag,
    isEditingCurrentTag,
    currentEditingTag,
    tag_list,
  }
}