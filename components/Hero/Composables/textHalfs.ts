import { computed, ComputedRef, unref, Ref } from 'vue';

const divideText = (text: string): string[] => {
  const textLength = text.length;
  const halfTextLength = Math.ceil(textLength / 2);
  let firstHalf = text.slice(0, halfTextLength);
  let secondHalf = text.slice(halfTextLength, textLength);
  const delta = secondHalf.indexOf(' ');
  firstHalf += secondHalf.slice(0, delta);
  secondHalf = secondHalf.slice(delta, secondHalf.length);
  return [firstHalf, secondHalf];
};

export function getTextHalfs(text: string| Ref<string>): { firstHalf: ComputedRef<string>; secondHalf: ComputedRef<string> } {

  const firstHalf: ComputedRef<string> = computed(() => divideText(unref(text))[0]);
  const secondHalf: ComputedRef<string> = computed(() => divideText(unref(text))[1]);

  return { firstHalf, secondHalf };
}
