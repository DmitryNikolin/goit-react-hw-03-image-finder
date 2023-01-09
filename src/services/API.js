import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '30807376-0b6c24285cff505c2f1e15934';
export const pageLimit = 12;
const searchParams = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
});

export const getGallery = async (query, page) => {
  const { data } = await axios.get(`/?q=${query}&page=${page}&${searchParams}`);
  return data;
};