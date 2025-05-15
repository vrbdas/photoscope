import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('themeStore', () => {
  const darkTheme = ref(false);

  return { darkTheme };
});
