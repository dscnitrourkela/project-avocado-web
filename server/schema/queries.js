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
      resolve(parent, args) {
        var result = Mentor.findOne(
          { rollNumber: args.rollNumber },
          (error, document) => {
            if (error) {
              return {
                error: error.toString(),
              };
            }
          }
        );
        return result;
      },
    },
    prefects: {
      type: new GraphQLList(PrefectType),
      resolve(parent, args) {
        return Prefect.find({});
      },
    },
    coordinators: {
      type: new GraphQLList(CoordinatorType),
      resolve(parent, args) {
        return Coordinator.find({});
      },
    },
  },
});

module.exports =  query;
