const graphql = require('graphql');
const Mentor = require('../models/mentor');
const Mentee = require('../models/mentee');
const Coordinator = require('../models/coordinator');
const Prefect = require('../models/prefect');

const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
} = graphql;

const CoordinatorType = new GraphQLObjectType({
  name: 'Coordinator',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    contact: { type: GraphQLString },
    rollNumber: { type: GraphQLString },
    email: { type: GraphQLString },
    designation: { type: GraphQLString },
    prefect: { type: GraphQLString },
    prefectDetails: {
      type: PrefectType,
      resolve(parent, args) {
        return Prefect.findOne({ rollNumber: parent.prefect });
      },
    },
  }),
});

const PrefectType = new GraphQLObjectType({
  name: 'Prefect',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    contact: { type: GraphQLString },
    email: { type: GraphQLString },
    rollNumber: { type: GraphQLString },
    coordinator: { type: GraphQLString },
    coordinatorDetails: {
      type: CoordinatorType,
      resolve(parent, args) {
        return Coordinator.findOne({ rollNumber: parent.coordinator });
      },
    },
  }),
});

const MentorType = new GraphQLObjectType({
  name: 'Mentor',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    rollNumber: { type: GraphQLString },
    contact: { type: GraphQLString },
    email: { type: GraphQLString },
    prefect: { type: GraphQLString },
    prefectDetails: {
      type: PrefectType,
      resolve(parent, args) {
        return Prefect.findOne({ rollNumber: parent.prefect });
      },
    },
    mentees: {
      type: new GraphQLList(MenteeType),
      resolve(parent, args) {
        return Mentee.find({ mentor: parent.rollNumber });
      },
    },
  }),
});

const MenteeType = new GraphQLObjectType({
  name: 'Mentee',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    rollNumber: { type: GraphQLString },
    contact: { type: GraphQLString },
    email: { type: GraphQLString },
    mentor: {
      type: MentorType,
      resolve(parent, args) {
        return Mentor.findOne({ rollNumber: parent.mentor });
      },
    },
  }),
});

module.exports = {
  CoordinatorType,
  PrefectType,
  MentorType,
  MenteeType,
};
