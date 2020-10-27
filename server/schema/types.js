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
    contact: { type: GraphQLInt },
    rollNumber: { type: GraphQLString },
    email: { type: GraphQLString },
    designation: { type: GraphQLString },
    prefect: { type: GraphQLID },
    prefectDetails: {
      type: PrefectType,
      resolve(parent, args) {
        return Prefect.findById(parent.prefect);
      },
    },
  }),
});

const PrefectType = new GraphQLObjectType({
  name: 'Prefect',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    contact: { type: GraphQLInt },
    email: { type: GraphQLString },
    rollNumber: { type: GraphQLString },
    coordinator: { type: GraphQLID },
    coordinatorDetails: {
      type: CoordinatorType,
      resolve(parent, args) {
        return Coordinator.findById(parent.coordinator);
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
    contact: { type: GraphQLInt },
    email: { type: GraphQLString },
    prefect: { type: GraphQLID },
    prefectDetails: {
      type: PrefectType,
      resolve(parent, args) {
        return Prefect.findById(parent.prefect);
      },
    },
    mentees: {
      type: new GraphQLList(MenteeType),
      resolve(parent, args) {
        return Mentee.find({ mentor: parent.id });
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
    contact: { type: GraphQLInt },
    email: { type: GraphQLString },
    mentor: {
      type: MentorType,
      resolve(parent, args) {
        return Mentor.findById(parent.mentor);
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
