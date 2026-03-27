import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoadMoreButton,
  showLoader,
  showLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import { more } from './js/render-functions';
import { imagesList } from './js/render-functions';
const form = document.querySelector('.js-form');

let query;
let page = 1;
let totalPage = 1;
const PER_PAGE = 15;
form.addEventListener('submit', async e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  query = formData.get('search-text').trim();
  page = 1;
  if (query === '') {
    return iziToast.error({
      title: 'помилка валідації',
      message: 'заповніть поля',
    });
  }
  showLoader();
  hideLoadMoreButton();
  clearGallery();
  try {
    const data = await getImagesByQuery(query, page);
    console.log(data);
    totalPage = Math.ceil(data.totalHits / PER_PAGE);
    if (data.hits.length === 0) {
      iziToast.error({
        title: 'помилка запиту',
        message: 'нічого не знайдено за вашим запитом',
      });
    }

    createGallery(data.hits);
  } catch (error) {
    iziToast.error({
      title: 'помилка запиту',
      message: 'щось трапилось під час запиту',
    });
  }

  hideLoader();

  if (totalPage > 1) {
    showLoadMoreButton();
  }

  form.reset();
});
more.addEventListener('click', async e => {
  page += 1;

  showLoader();
  hideLoadMoreButton();
  try {
    const data = await getImagesByQuery(query, page);

    createGallery(data.hits);
    scrollDown();
  } catch (error) {
    iziToast.error({
      title: 'помилка запиту',
      message: 'щось трапилось під час запиту',
    });
  }

  hideLoader();

  if (page < totalPage) {
    showLoadMoreButton();
  }
});
function scrollDown() {
  const card = imagesList.firstElementChild;
  const height = card.getBoundingClientRect().height;
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
