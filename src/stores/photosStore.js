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
  const sortFunctions = {
    id: {
      asc: (a, b) => a.id - b.id,
      des: (a, b) => b.id - a.id,
    },
    albumId: {
      asc: (a, b) => a.albumId - b.albumId,
      des: (a, b) => b.albumId - a.albumId,
    },
    title: {
      asc: (a, b) => a.title.localeCompare(b.title),
      des: (a, b) => b.title.localeCompare(a.title),
    }
  };

  // ленивая загрузка, работает до нажатия на кнопку поиск
  async function loadPhotos(reset = false) { // сброс при нажатии на фильтр
    if (loading.value || finished) return;

    if (reset) {
      photos.value = [];
      page = 0;
    }

    loading.value = true;

    // GET https://jsonplaceholder.typicode.com/photos?_start=0&_limit=30&_sort=id&_order=desc
    //_sort, _order - сортировка
    // _limit, _start - пагинация

    try {
      const params = {
        _start: page * limit,
        _limit: limit,
        _sort: sort.value,
        _order: order.value === 'asc' ? 'asc' : 'desc',
      };

      const response = await axios.get(url, {
        params,
        timeout: 20000,
      });
      const newPhotos = response.data;

      if (newPhotos.length === 0) {
        finished = true;
      } else {
        photos.value.push(...newPhotos);
        page++;
      }
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        console.error('Ошибка загрузки фото: Таймаут запроса');
      } else {
        console.error('Ошибка загрузки фото:', err);
      }
    } finally {
      loading.value = false;
    }
  }

  // обработка нажатия на шапку таблицы
  function setSort(val) {
    if (sort.value === val) {
      order.value = order.value === 'asc' ? 'des' : 'asc'; // повторное нажатие на тот же заголовок меняет порядок сортировки
    } else {
      sort.value = val;
      order.value = 'asc';
    }

    if (!finished) {
      loadPhotos(true); // пока не нажата кнопка поиск или не подгружены все 5000 фото, работает ленивая загрузка, сортировка на сервере
    } else { // когда загружены все фото или результаты поиска по альбомам, то сортирует уже их
      photos.value.sort(sortFunctions[sort.value][order.value]);
    };
  }

  // загрузка всех фото с указанными albumId
  async function loadAllPhotos(input) {
    finished = true;
    loading.value = true;

    // создает массив разделяя ввод через запятые или пробелы, потом добавляет к каждому элементу строку для запроса (к первому начинающуюся с ?)
    const inputArr = input.split(/[ ,]+/).map((value, index) => {
      return index === 0 ? `?albumId=${value}` : `&albumId=${value}`;
    });
    const inputStr = input ? inputArr.join('') : ''; // если input пустой, показывает все записи

    try {
      const response = await axios.get(`${url}${inputStr}`, {
        timeout: 20000,
      });
      photos.value = response.data;
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        console.error('Ошибка загрузки фото: Таймаут запроса');
      } else {
        console.error('Ошибка загрузки фото:', err);
      }
    } finally {
      loading.value = false;
    }
  }

  return {
    photos,
    loadPhotos,
    loading,
    setSort,
    sort,
    order,
    loadAllPhotos,
  };
});
