import { getImagesByQuery } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
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
let totalPages = 1;
let currentQuery = '';
let totalHits = 0;
let lightbox;

document.querySelector('.form').addEventListener('submit', async event => {
  event.preventDefault();
  const searchInput = event.target.elements['search-text'];
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
    resetPagination(query);
    currentQuery = query;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await fetchImages(query);
    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'Warning',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      createGallery(data.hits);
      if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionDelay: 250,
        });
      }
      lightbox.refresh();
      if (data.hits.length < 15 || totalHits <= page * 15) {
        hideLoadMoreButton();
        if (totalHits > 0) {
          iziToast.info({
            title: 'Info',
            message:
              "We're sorry, but you've reached the end of search results.",
            position: 'topRight',
          });
        }
      } else {
        showLoadMoreButton();
      }
      smoothScroll();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'There was an error loading the images. Please try again.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    searchInput.value = '';
  }
});

document.querySelector('.load-more').addEventListener('click', async () => {
  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await fetchImages(currentQuery);
    createGallery(data.hits);
    lightbox.refresh();
    if (page * 15 >= totalHits || data.hits.length < 15) {
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

async function fetchImages(query) {
  showLoader();
  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;
    totalPages = Math.ceil(totalHits / 15);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch images: ${error.message}`);
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const cardHeight =
    document.querySelector('.photo-card')?.getBoundingClientRect().height || 0;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function resetPagination(query) {
  page = 1;
  totalPages = 1;
  currentQuery = query;
  totalHits = 0;
  clearGallery();
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
  hideLoadMoreButton();
}
