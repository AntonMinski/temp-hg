<template>
  <Teleport to="body">
    <div v-show="open" :class="modalWrapperClasses">
      <div :class="modalClasses">
        <div :class="modalContentClasses">
          <!-- Modal close icon -->
          <UIButton type="button" :class="closeIconClasses" @click="emit('close')">
            <UIIcon icon="icon-close" />
            <span class="sr-only">Close modal</span>
          </UIButton>

          <!-- Modal content -->
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { PropType, toRefs } from 'vue';
import { useModalClasses } from './composables/useModalClasses';
import type { ModalSize } from './types';

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<ModalSize>,
    default: 'md',
  },
  wrapperClasses: {
    type: String,
    default: '',
  },
  contentClasses: {
    type: String,
    default: '',
  },
});

const { modalWrapperClasses, modalClasses, modalContentClasses, closeIconClasses } = useModalClasses(toRefs(props));

const emit = defineEmits(['close']);
</script>
