import axios from 'axios';

export const getImages = (query, page) => {
  const KEY = '40865499-984f6d4bf951e94a81d50a698';
  return axios.get(
    `https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&per_page=12&page=${page}`
  );
};

export default getImages;
