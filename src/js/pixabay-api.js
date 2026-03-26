import axios from 'axios';

export function getImagesByQuery(query) {
  return axios
    .get('https://pixabay.com/api/', {
      params: {
        key: '55130808-0237c91bd8603b9007a67866c',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 20,
        safesearch: true,
      },
    })
    .then(res => res.data);
}
