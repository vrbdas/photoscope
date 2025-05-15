<script setup>
import { ref } from 'vue';
import { usePhotosStore } from '@/stores/photosStore.js';

const photosStore = usePhotosStore();
const input = ref('');
const errorShow = ref(false);

function search() {
  // пустая строка проходит валидацию - такое условие задания
  const pattern = /^$|^\d+(?:[ ,]+\d+)*$/;
  const isValid = pattern.test(input.value.trim());
  if (isValid) {
    errorShow.value = false;
    photosStore.loadAllPhotos(input.value);
  } else {
    errorShow.value = true;
  }
}
</script>

<template>
  <div class="container mx-auto">
    <div class="mb-10 flex flex-col items-center gap-10 pt-10">
      <div class="flex items-center justify-center gap-4">
        <h1 class="text-4xl font-bold">PhotoScope — Галерея фотографий</h1>
        <label class="relative inline-block h-[34px] w-[60px]">
          <input type="checkbox" class="peer hidden" />
          <div
            class="duration-400 bg-(--color-dark) absolute bottom-0 left-0 right-0 top-0 cursor-pointer rounded-full transition peer-checked:bg-neutral-900 peer-focus:ring-2 peer-focus:ring-neutral-900"
          ></div>
          <div
            class="duration-400 absolute bottom-1 left-1 h-[26px] w-[26px] cursor-pointer rounded-full bg-white transition peer-checked:translate-x-[26px]"
          ></div>
        </label>
      </div>
      <div class="flex w-[600px] items-center justify-center gap-[20px]">
        <label class="relative grow">
          <input
            v-model="input"
            class="w-full border-0 bg-white px-5 py-2 focus:outline-0"
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
        <button class="bg-(--color-light) cursor-pointer px-5 py-2 font-bold" @click="search">
          Поиск
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
