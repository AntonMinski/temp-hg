import { Ref } from 'vue';

export type size = 'default' | 'large';

export type SearchProps = {
  size: Ref<size>;
}
