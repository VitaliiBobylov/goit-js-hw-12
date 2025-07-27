import axios from 'axios';

const API_KEY = '51387635-d1faa43170eec50f2b7d86b54';
const BASE_URL = 'https://pixabay.com/api/';
export const PERPAGE = 15;

export async function getImagesByQuery(query, page = 1) {
  const params = {
    key: API_KEY,
    q: encodeURIComponent(query),
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: PERPAGE,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch images: ${error.message}`);
  }
}
