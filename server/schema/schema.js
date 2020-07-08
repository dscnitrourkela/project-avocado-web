const graphql = require("graphql");
const Mentor = require("../models/mentor");
const Mentee = require("../models/mentee");

const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} = graphql;

const MentorType = new GraphQLObjectType({
  name: "Mentor",
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
  name: "Mentee",
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
  name: "RootQueryType",
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
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
