<script setup>
import { ref } from 'vue';
import IconSun from './icons/IconSun.vue';
import IconMoon from './icons/IconMoon.vue';
import { useThemeStore } from '@/stores/themeStore.js';

const themeStore = useThemeStore();
const showMoon = ref(themeStore.darkTheme);

// меняет иконки после завершения анимации ползунка
function handleTransitionEnd() {
  showMoon.value = themeStore.darkTheme;
}
</script>

<template>
  <label class="absolute right-0 top-0 inline-block h-[34px] w-[60px]">
    <input v-model="themeStore.darkTheme" type="checkbox" class="peer hidden" />
    <div
      class="duration-400 bg-(--color-secondary) absolute bottom-0 left-0 right-0 top-0 cursor-pointer rounded-full transition peer-checked:bg-neutral-900 peer-focus:ring-2 peer-focus:ring-neutral-900"
    ></div>
    <div
      class="duration-400 absolute bottom-1 left-1 flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-full bg-white p-1 transition peer-checked:translate-x-[26px]" @transitionend="handleTransitionEnd"
    >
      <IconSun v-if="!showMoon" />
      <IconMoon v-else />
    </div>
  </label>
</template>

<style scoped></style>
