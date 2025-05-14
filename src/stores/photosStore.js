import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const usePhotosStore = defineStore('photosStore', () => {
  const photos = ref([]);
  const loading = ref(false);
  const sort = ref('id');
  const order = ref('asc');

  let page = 0;
  let finished = false;
  const limit = 30;
  const url = 'https://jsonplaceholder.typicode.com/photos';

  async function loadPhotos(reset = false) {
    if (loading.value || (finished && !reset)) return;

    if (reset) {
      photos.value = [];
      page = 0;
      finished = false;
    }

    loading.value = true;
    try {
      const params = {
        _start: page * limit,
        _limit: limit,
        _sort: sort.value,
        _order: order.value === 'asc' ? 'asc' : 'desc',
      };

      const response = await axios.get(url, { params });
      const newPhotos = response.data;

      if (newPhotos.length === 0) {
        finished = true;
      } else {
        photos.value.push(...newPhotos);
        page++;
      }
    } catch (err) {
      console.error('Ошибка загрузки фото:', err);
    } finally {
      loading.value = false;
    }
  }

  function setSort(val) {
    if (sort.value === val) {
      order.value = order.value === 'asc' ? 'des' : 'asc';
    } else {
      sort.value = val;
      order.value = 'asc';
    }
    loadPhotos(true);
  }

  return {
    photos,
    loadPhotos,
    loading,
    setSort,
    sort,
    order,
  };
});
