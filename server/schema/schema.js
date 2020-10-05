const { GraphQLSchema } = require('graphql');

const RootQuery = require('./queries');
const mutation = require('./mutations');

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
