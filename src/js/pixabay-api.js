import axios from 'axios';

const API_KEY = '49562939-96fa6d51fabb6fe43d2deafb6';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(query, page = 1, perPage = 15) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  return axios.get(url).then(response => response.data);
}
