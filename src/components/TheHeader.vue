<script setup>
import { usePhotosStore } from '@/stores/photosStore.js';

const photosStore = usePhotosStore();
</script>

<template>
  <div class="container mx-auto">
    <div class="mb-10 flex flex-col items-center gap-10 pt-10">
      <div class="flex items-center justify-center gap-4">
        <h1 class="text-4xl font-bold">PhotoScope — Галерея фотографий</h1>
        <label class="relative inline-block h-[34px] w-[60px]">
          <input type="checkbox" class="peer hidden" />
          <div
            class="duration-400 absolute bottom-0 left-0 right-0 top-0 cursor-pointer rounded-full bg-(--color-dark) transition peer-checked:bg-neutral-900 peer-focus:ring-2 peer-focus:ring-neutral-900"
          ></div>
          <div
            class="duration-400 absolute bottom-1 left-1 h-[26px] w-[26px] cursor-pointer rounded-full bg-white transition peer-checked:translate-x-[26px]"
          ></div>
        </label>
      </div>
      <div class="flex w-[600px] items-center justify-center gap-[20px]">
        <input
          class="grow border-0 bg-white px-5 py-2 focus:outline-0"
          type="text"
          placeholder="Введите ID альбомов"
        />
        <button class="bg-(--color-light) cursor-pointer px-5 py-2 font-bold" @click="photosStore.loadAllPhotos">Поиск</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
