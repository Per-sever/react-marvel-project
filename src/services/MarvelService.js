import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=1e17c0e2ea3018953b277303889fb113';
  const _baseOffSet = 210;

  const getAllCharacters = async (offset = _baseOffSet) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComic);
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComic(res.data.results[0]);
  };

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);

    return res.data.results.map(_transformCharacter);
  };

  const _transformComic = (comic) => {
    return {
      id: comic.id,
      description: comic.description || 'There is no description',
      pageCount: comic.pageCount
        ? `${comic.pageCount} p.`
        : 'No iformation about the number of pages',
      language: comic.textObjects.language || 'Language: en-us',
      thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
      title: comic.title,
      price: comic.prices.price ? `${comic.prices.price}$` : 'not available',
    };
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : 'There is no description for this character',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    clearError,
    getCharacterByName,
    getAllComics,
    getComic,
  };
};

export default useMarvelService;
