export const BASE_URL = 'https://pixabay.com/api/',
  API_KEY = '30807376-0b6c24285cff505c2f1e15934',
  SEARCH_PARAMS = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  });
