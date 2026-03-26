import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightBox = new SimpleLightbox('.gallery a');
const imagesList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

export function createGallery(images) {
  const galleryMarkup = images
    .map(image => {
      return `<li class="gallery-item">
      <a class="gallery-link" href="${image.largeImageURL}">
        <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
      </a>
      <div class="info">
        <div>likes${image.likes}</div>
        <div>views${image.views}</div>
        <div>comments${image.comments}</div>
        <div>downloads${image.downloads}</div>
      </div>
    </li>`;
    })
    .join('');
  imagesList.insertAdjacentHTML('beforeend', galleryMarkup);

  lightBox.refresh();
}

export function clearGallery() {
  imagesList.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}
showLoadMoreButton(){ };
hideLoadMoreButton(){ };