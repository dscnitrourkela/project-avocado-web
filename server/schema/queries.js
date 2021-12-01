const { GraphQLString, GraphQLObjectType, GraphQLList } = require("graphql");

// Mongoose Schemas
const Mentor = require("../models/mentor");
const Mentee = require("../models/mentee");
const Coordinator = require("../models/coordinator");
const Prefect = require("../models/prefect");

// GraphQL Types
const {
  CoordinatorType,
  PrefectType,
  MentorType,
  MenteeType,
} = require("./types");

const query = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // Get Members by Rollnumbers
    getMenteeByRollnumber: {
      type: MenteeType,
      args: { rollNumber: { type: GraphQLString } },
      resolve(parent, args) {
        return Mentee.findOne({ rollNumber: args.rollNumber });
      },
    },
    getMentorByRollnumber: {
      type: MentorType,
      args: { rollNumber: { type: GraphQLString } },
      async resolve(parent, args) {
        return Mentor.findOne({ rollNumber: args.rollNumber });
      },
    },
    getPrefectByRollnumber: {
      type: new GraphQLList(PrefectType),
      args: { rollNumber: { type: GraphQLString } },
      resolve(parent, args) {
        return Prefect.find({ rollNumber: args.rollNumber });
      },
    },
    getCoordinatorByRollnumber: {
      type: new GraphQLList(CoordinatorType),
      args: { rollNumber: { type: GraphQLString } },
      resolve(parent, args) {
        return Coordinator.find({ rollNumber: args.rollNumber });
      },
    },

    // Get all members
    getMentees: {
      type: new GraphQLList(MenteeType),
      args: {},
      async resolve() {
        return Mentee.find({});
      },
    },
    getMentors: {
      type: new GraphQLList(MenteeType),
      args: {},
      async resolve() {
        return Mentor.find({});
      },
    },
    getPrefects: {
      type: new GraphQLList(MenteeType),
      args: {},
      async resolve() {
        return Prefect.find({});
      },
    },
    getCoordinators: {
      type: new GraphQLList(MenteeType),
      args: {},
      async resolve() {
        return Coordinator.find({});
      },
    },
  },
});

module.exports = query;
