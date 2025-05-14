import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const usePhotosStore = defineStore('photosStore', () => {
  const photos = ref([]);
  const loading = ref(false);
  const page = ref(0);
  const limit = 30;
  const finished = ref(false);

  const url = 'https://jsonplaceholder.typicode.com/photos';

  // ленивый скролл
  async function loadMorePhotos() {
    if (loading.value || finished.value) return;

    loading.value = true;
    try {
      // загружает по 30 записей
      const response = await axios.get(`${url}?_start=${page.value * limit}&_limit=${limit}`);
      const newPhotos = response.data;

      // если загружены последние записи из БД, прекращает работу (условие в начале)
      if (newPhotos.length === 0) {
        finished.value = true;
      } else {
        // иначе добавляет подгруженные записи в photos
        photos.value.push(...newPhotos);
        page.value++; // при прокрутке до конца подгрузит следующие 30 записей
      }
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  }

  // загрузка всех записей
  async function loadAllPhotos() {
    loading.value = true;
    try {
      const response = await axios.get(url);
      photos.value = response.data;
      finished.value = true; // отключает ленивый скролл
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  }

  // watch(
  //   () => photos.value,
  //   (newValue) => {
  //     if (photos.value.length > 0) {
  //       localStorage.setItem('photos', JSON.stringify(newValue));
  //     } else {
  //       localStorage.removeItem('photos');
  //     }
  //   },
  //   { deep: true }
  // );

  return { photos, loadMorePhotos, loadAllPhotos };
});
