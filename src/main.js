import { getImagesByQuery, PERPAGE } from './js/pixabay-api.js';
import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';
import {
  createGallery,
  hideLoadMoreButton,
  showLoadMoreButton,
  hideLoader,
  showLoader,
  clearGallery,
} from './js/render-functions.js';

let page = 1;
let currentQuery = '';
let totalHits = 0;

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');
const searchInput = form.elements['search-text'];

form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = searchInput.value.trim();
  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  if (query !== currentQuery) {
    currentQuery = query;
    page = 1;
    totalHits = 0;
    clearGallery();
    hideLoadMoreButton();
  }

  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'Warning',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    searchInput.value = query;
    if (page * PERPAGE >= totalHits || data.hits.length < PERPAGE) {
      hideLoadMoreButton();

      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
    smoothScroll();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'There was an error loading the images. Please try again.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    createGallery(data.hits);

    if (page * PERPAGE >= totalHits || data.hits.length < PERPAGE) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
    smoothScroll();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'There was an error loading the images. Please try again.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

function smoothScroll() {
  const cardHeight =
    document.querySelector('.photo-card')?.getBoundingClientRect().height || 0;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
