import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const usePhotosStore = defineStore('photosStore', () => {
  const photos = ref([]);
  const loading = ref(false);
  const sort = ref('id');
  const order = ref('ascending');

  let page = 0;
  let finished = false;
  const limit = 30;
  const url = 'https://jsonplaceholder.typicode.com/photos';

  // ленивый скролл
  async function loadMorePhotos() {
    if (loading.value || finished) return;

    loading.value = true;
    try {
      // загружает по 30 записей
      const response = await axios.get(`${url}?_start=${page * limit}&_limit=${limit}`);
      const newPhotos = response.data;

      // если загружены последние записи из БД, прекращает работу (условие в начале)
      if (newPhotos.length === 0) {
        finished = true;
      } else {
        // иначе добавляет подгруженные записи в photos
        photos.value.push(...newPhotos);
        page++; // при прокрутке до конца подгрузит следующие 30 записей
      }
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  }

  // загрузка всех записей
  async function loadAllPhotos() {
    if (loading.value || finished) return;

    loading.value = true;
    try {
      const response = await axios.get(url);
      photos.value = response.data;
      finished = true; // отключает ленивый скролл
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  }

  // сортировка
  function setSort(val) {
    loadAllPhotos(); // при выборе сортировки загружает все записи

    if (sort.value === val) { // меняет порядок при повторном клике
      order.value = (order.value === 'ascending') ? 'descending' : 'ascending';
    } else {
      order.value = 'ascending'; // сначала от меньшего к большему
      sort.value = val;
    }
  }

  const sortFunctions = {
    id: {
      ascending: (a, b) => a.id - b.id,
      descending: (a, b) => b.id - a.id,
    },
    albumId: {
      ascending: (a, b) => a.albumId - b.albumId,
      descending: (a, b) => b.albumId - a.albumId,
    },
    title: {
      ascending: (a, b) => a.title.localeCompare(b.title),
      descending: (a, b) => b.title.localeCompare(a.title),
    }
  };

  const photosFiltered = computed(() => {
    return [...photos.value].sort(sortFunctions[sort.value][order.value]);
  });




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

  return { photos, loadMorePhotos, loadAllPhotos, loading, photosFiltered, setSort, sort, order };
});
