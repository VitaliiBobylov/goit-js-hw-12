import { getImagesByQuery } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  clearGallery,
  showLoader,
  hideLoader,
  createGallery,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
form.addEventListener('submit', event => {
  event.preventDefault();
  const searchInput = form.querySelector('input[name="search-text"]');
  const query = searchInput.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (data && data.hits && data.hits.length > 0) {
        createGallery(data.hits);
      } else {
        iziToast.warning({
          title: 'Warning',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'There was an error loading the images. Please try again.',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
      searchInput.value = '';
    });
});
