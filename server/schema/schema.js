const graphql = require('graphql');
const Mentor = require('../models/mentor');
const Mentee = require('../models/mentee');
const Coordinator = require('../models/coordinator');
const Prefect = require('../models/prefect');

const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = graphql;

const CoordinatorType = new GraphQLObjectType({
  name: 'Coordinator',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    contact: { type: GraphQLString },
    email: { type: GraphQLString },
    designation: { type: GraphQLString },
  }),
});

const PrefectType = new GraphQLObjectType({
  name: 'Prefect',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    contact: { type: GraphQLString },
    email: { type: GraphQLString },
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
    contact: { type: GraphQLString },
    email: { type: GraphQLString },
    prefect: { type: GraphQLID },
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
    mentor: {
      type: MentorType,
      resolve(parent, args) {
        return Mentor.findById(parent.mentor);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
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

const mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    addMentee: {
      type: MenteeType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        rollNumber: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        contact: { type: new GraphQLNonNull(GraphQLInt) },
        mentor: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { name, rollNumber, mentor }) {
        const mentee = new Mentee({
          name,
          rollNumber,
          email,
          contact,
          mentor,
        });

        try {
          await mentee.save();
        } catch (error) {
          console.log(error);
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
