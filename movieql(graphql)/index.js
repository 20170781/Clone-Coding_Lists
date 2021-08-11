import { GraphQLServer } from 'graphql-yoga';

const server = new GraphQLServer({});

server.start(() => console.log('GrpahQL Server Running'));
