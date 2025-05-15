<script setup>
import { onMounted, ref, watch } from 'vue';
import { usePhotosStore } from '@/stores/photosStore.js';
import AppSwitch from '@/components/AppSwitch.vue';
import AppSpinner from '@/components/AppSpinner.vue';

const photosStore = usePhotosStore();
const input = ref('');
const errorShow = ref(false);

function search() {
  // пустая строка проходит валидацию - такое условие задания
  const pattern = /^$|^\d+(?:[ ,]+\d+)*$/;
  const isValid = pattern.test(input.value.trim());
  if (isValid) {
    errorShow.value = false;
    localStorageSet(); // сохраняет ввод в localStorage
    photosStore.loadAllPhotos(input.value);
  } else {
    errorShow.value = true;
  }
}

function localStorageSet() {
  if (input.value.length > 0) {
    localStorage.setItem('albumIds', JSON.stringify(input.value));
  } else {
    localStorage.removeItem('albumIds');
  }
}

// при перезагрузке восстановится ввод в поле поиска
onMounted(() => {
  input.value = JSON.parse(localStorage.getItem('albumIds') || '""');
});
</script>

<template>
  <div class="container mx-auto">
    <div class="mb-10 flex flex-col items-center gap-10 pt-10">
      <div class="relative flex w-[600px] items-center justify-center">
        <div class="flex flex-col">
          <h1 class="font-logo select-none text-6xl font-bold dark:text-white">PhotoScope</h1>
          <span class="text-primary select-none text-sm uppercase tracking-widest dark:text-primary-dark"
            >Галерея фотографий</span
          >
        </div>
        <AppSwitch />
      </div>
      <div class="flex w-[600px] items-center justify-center gap-[20px]">
        <label class="relative grow">
          <input
            v-model="input"
            class="h-[40px] w-full border-0 bg-white text-black dark:bg-black dark:text-white px-5 focus:outline-0"
            type="text"
            placeholder="Введите ID альбомов через пробел или запятую"
            @focus="errorShow = false"
          />
          <Transition name="fade">
            <span v-if="errorShow" class="absolute left-5 top-[40px] text-sm text-red-700"
              >Введите только числа через пробел или запятую</span
            >
          </Transition>
        </label>
        <button
          :disabled="photosStore.loading"
          class="bg-primary disabled:bg-secondary hover:bg-primary-hover flex h-[40px] w-[100px] cursor-pointer items-center justify-center font-bold transition disabled:cursor-auto disabled:text-gray-500 dark:bg-primary-dark dark:hover:bg-primary-hover-dark dark:text-white"
          @click="search"
        >
          <AppSpinner v-if="photosStore.loading" />
          <span v-else>Поиск</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
