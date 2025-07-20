import axios from 'axios';

const API_key = '51387635-d1faa43170eec50f2b7d86b54';

const base_url = `https://pixabay.com/api/`;

export function getImagesByQuery(query) {
  const params = {
    key: API_key,
    q: query,
    image_type: `photo`,
    orientation: `horizontal`,
    safesearch: true,
  };

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  return delay(2000).then(() => {
    return axios
      .get(base_url, { params })

      .then(response => {
        const data = response.data;
        if (!data.hits || data.hits.length === 0) {
          throw new Error('No images found');
        }
        return data;
      })
      .catch(error => {
        throw error;
      });
  });
}
