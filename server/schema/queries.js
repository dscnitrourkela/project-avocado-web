const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
} = require('graphql');
const Mentor = require('../models/mentor');
const Mentee = require('../models/mentee');
const Coordinator = require('../models/coordinator');
const Prefect = require('../models/prefect');
const {
  CoordinatorType,
  PrefectType,
  MentorType,
  MenteeType,
} = require('./types');

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    mentee: {
      type: MenteeType,
      args: { rollNumber: { type: GraphQLString } },
      resolve(parent, args) {
        return Mentee.findOne({ rollNumber: args.rollNumber });
      },
    },
    mentor: {
      type: MentorType,
      args: { rollNumber: { type: GraphQLString } },
      async resolve(parent, args) {
        return Mentor.findOne({ rollNumber: args.rollNumber });
      },
    },
    prefects: {
      type: new GraphQLList(PrefectType),
      args: {},
      resolve(parent, args) {
        return Prefect.find({});
      },
    },
    coordinators: {
      type: new GraphQLList(CoordinatorType),
      args: {},
      resolve(parent, args) {
        return Coordinator.find({});
      },
    },
  },
});

module.exports =  query;
