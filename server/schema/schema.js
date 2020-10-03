const query = require('./queries');
const mutation = require('./mutations');

module.exports = new GraphQLSchema({
  query,
  mutation,
});
