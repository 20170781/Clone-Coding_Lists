import { GraphQLServer } from 'graphql-yoga';
import resolvers from './graphql/resolver';

const typeDefs = 'graphql/schema.graphql';

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('GrpahQL Server Running'));
