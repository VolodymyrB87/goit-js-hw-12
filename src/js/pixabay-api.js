import axios from 'axios';

export async function getImagesByQuery(query, page) {
  const params = {
    key: '55130808-0237c91bd8603b9007a67866c',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 15,
    page: page,
    safesearch: true,
  };
  const res = await axios.get('https://pixabay.com/api/', {
    params,
  });
  return res.data;
}
