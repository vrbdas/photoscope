<script setup>
import { onMounted } from 'vue';
import { usePhotosStore } from '@/stores/photosStore.js';
import IconArrowDown from '@/components/icons/IconArrowDown.vue';
import IconArrowUp from '@/components/icons/IconArrowUp.vue';

const photosStore = usePhotosStore();

onMounted(() => { // при монтировании подгружает первые 30 фото
  photosStore.loadPhotos();
});

function handleScroll(event) {
  // scrollTop - на сколько было прокручено от верха, в начале 0, в конце 524px
  // clientHeight - высота видимой части - блока с таблицей (600px)
  // scrollHeight - высота всей таблицы, включая скрытую часть (1124px)
  // el.scrollTop + el.clientHeight === el.scrollHeight когда прокрутили до конца
  const el = event.target;
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
    photosStore.loadPhotos();
  }
}

function thClickHandler(val) {
  photosStore.setSort(val);
}
</script>

<template>
  <div v-if="photosStore.photos.length > 0" class="mx-auto h-[600px] w-[600px] overflow-y-auto bg-white" @scroll="handleScroll">
    <table class="h-full w-full table-fixed border-collapse text-black dark:text-white">
      <thead class="bg-secondary dark:bg-secondary-dark sticky top-0 z-10">
        <tr>
          <th class="bg-secondary dark:bg-secondary-dark sticky top-0 w-[15%] py-3 pl-5 pr-2 text-left text-sm">
            <div class="flex cursor-pointer select-none items-center" @click="thClickHandler('id')">
              ID
              <div v-if="photosStore.sort === 'id'" class="shrink-0">
                <Component :is="photosStore.order === 'asc' ? IconArrowUp : IconArrowDown" />
              </div>
            </div>
          </th>
          <th class="bg-secondary dark:bg-secondary-dark sticky top-0 w-[15%] px-2 py-3 text-left text-sm">
            <div
              class="flex cursor-pointer select-none items-center"
              @click="thClickHandler('albumId')"
            >
              Альбом
              <div v-if="photosStore.sort === 'albumId'" class="shrink-0">
                <Component :is="photosStore.order === 'asc' ? IconArrowUp : IconArrowDown"/>
              </div>
            </div>
          </th>
          <th class="bg-secondary dark:bg-secondary-dark sticky top-0 w-[20%] px-2 py-3 text-left text-sm">
            <div
              class="flex cursor-pointer select-none items-center"
              @click="thClickHandler('title')"
            >
              Название
              <div v-if="photosStore.sort === 'title'" class="shrink-0">
                <Component :is="photosStore.order === 'asc' ? IconArrowUp : IconArrowDown" />
              </div>
            </div>
          </th>
          <th
            class="bg-secondary dark:bg-secondary-dark sticky top-0 w-[20%] select-none px-2 py-3 text-left text-sm"
          >
            Ссылка
          </th>
          <th
            class="bg-secondary dark:bg-secondary-dark sticky top-0 w-[20%] select-none py-3 pl-2 pr-5 text-left text-sm"
          >
            Миниатюра
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="photo in photosStore.photos"
          :key="photo.id"
          class="odd:bg-gray-50 even:bg-white dark:odd:bg-[#060504] dark:even:bg-black"
        >
          <td class="truncate py-2 pl-5 pr-2 text-sm">{{ photo.id }}</td>
          <td class="truncate px-2 py-2 text-sm">{{ photo.albumId }}</td>
          <td class="truncate px-2 py-2 text-sm" :title="photo.title">
            {{ photo.title }}
          </td>
          <td class="truncate px-2 py-2 text-sm" :title="photo.url">
            {{ photo.url }}
          </td>
          <td class="truncate py-2 pl-2 pr-5 text-sm" :title="photo.thumbnailUrl">
            {{ photo.thumbnailUrl }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else-if="!photosStore.loading" class="w-full h-full flex items-center justify-center">Альбомы не найдены</div>
</template>

<style scoped></style>
