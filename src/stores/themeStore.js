import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { useDark } from '@vueuse/core';

export const useThemeStore = defineStore('themeStore', () => {
  // isDark добавляет в <html class="dark">
  const isDark = useDark();

  const darkTheme = ref(isDark.value);

  // синхронизирует darkTheme с isDark
  watch(isDark, (newVal) => {
    darkTheme.value = newVal;
  });

  function toggleTheme() {
    isDark.value = !isDark.value;
  }

  return { darkTheme, toggleTheme };
});
