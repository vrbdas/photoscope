<script setup>
import { ref, watch } from 'vue';
import IconSun from '@/components/icons/IconSun.vue';
import IconMoon from '@/components/icons/IconMoon.vue';
import { useThemeStore } from '@/stores/themeStore.js';

const themeStore = useThemeStore();
const showMoon = ref(themeStore.darkTheme);

watch(() => themeStore.darkTheme, (newVal) => {
  showMoon.value = newVal;
});
</script>

<template>
  <label class="absolute right-0 top-[50%] inline-block h-[34px] w-[60px] translate-y-[-50%]">
    <input v-model="themeStore.darkTheme" type="checkbox" class="peer hidden" @change="themeStore.toggleTheme"/>
    <div
      class="duration-400 bg-secondary absolute bottom-0 left-0 right-0 top-0 cursor-pointer rounded-full transition peer-checked:bg-secondary-dark peer-focus:ring-2 peer-focus:ring-secondary-dark"
    ></div>
    <div
      class="duration-400 absolute bottom-1 left-1 flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-full bg-white dark:bg-black transition peer-checked:translate-x-[26px]"
    >
      <IconSun v-if="!showMoon" />
      <IconMoon v-else />
    </div>
  </label>
</template>

<style scoped></style>
