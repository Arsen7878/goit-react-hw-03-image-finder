function fetchImagesAPI(keyword, page) {
  const API_KEY = '24760517-308a82b19588512bdc36b5eaa';
  const URL = `https://pixabay.com/api/?q=${keyword}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(URL).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Картинок по запросу ${keyword} не найдено`),
    );
  });
}

export default fetchImagesAPI;
