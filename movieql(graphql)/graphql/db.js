export let movies = [
  {
    id: '1',
    name: '해리포터',
    score: 0.8,
  },
  {
    id: '2',
    name: '아이언맨',
    score: 0.7,
  },
  {
    id: '3',
    name: '기생충',
    score: 0.9,
  },
  {
    id: '4',
    name: '어벤져스',
    score: 0.8,
  },
];

export const getMovies = () => movies;

export const getById = (id) => {
  const filteredMovies = movies.filter((movie) => id === movie.id);
  return filteredMovies[0];
};

export const addMovie = (name, score) => {
  const newMovie = {
    id: `${movies.length + 1}`,
    name,
    score,
  };
  movies.push(newMovie);
  return newMovie;
};

export const deleteMovie = (id) => {
  const cleanedMovies = movies.filter((movie) => id != movie.id);
  if (movies.length > cleanedMovies.length) {
    movies = cleanedMovies;
    return true;
  } else {
    return false;
  }
};
