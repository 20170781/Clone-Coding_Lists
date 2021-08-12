import { movies, getMovies } from './db';

const resolvers = {
  Query: {
    movieList: (_, { limit, rating }) => getMovies(limit, rating),
  },
};

export default resolvers;
