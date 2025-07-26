const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

export function createGallery(images) {
  if (!images || images.length === 0) {
    galleryContainer.innerHTML =
      '<li style="grid-column: 1 / -1; text-align: center; font-size: 18px; color: #666;">No images found.</li>';
    return;
  }
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="photo-card">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
            <p><b>Likes:</b> ${likes}</p>
            <p><b>Views:</b> ${views}</p>
            <p><b>Comments:</b> ${comments}</p>
            <p><b>Downloads:</b> ${downloads}</p>
          </div>
        </li>
      `
    )
    .join('');
  galleryContainer.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('is-visible');
}

export function hideLoader() {
  loader.classList.remove('is-visible');
}

export function showLoadMoreButton() {
  loadMoreButton.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreButton.classList.add('is-hidden');
}
