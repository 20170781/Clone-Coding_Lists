import { peopleList } from './db';

const resolvers = {
  Query: {
    people: () => peopleList,
    person: (_, { id }) => getById(id),
  },
};

const getById = (id) => {
  const filteredPeople = peopleList.filter((person) => id === person.id);
  return filteredPeople[0];
};

export default resolvers;
