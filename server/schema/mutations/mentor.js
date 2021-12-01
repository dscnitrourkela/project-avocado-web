const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
} = require("graphql");

// Mongoose Models
const Mentor = require("../../models/mentor");

// GraphQL Types
const { MentorType } = require("../types");

const addMentor = {
  type: MentorType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    rollNumber: { type: new GraphQLNonNull(GraphQLString) },
    contact: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    prefect: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, { name, rollNumber, contact, email, prefect }) {
    try {
      const mentor = new Mentor({
        name,
        rollNumber,
        contact,
        email,
        prefect,
      });

      return await mentor.save();
    } catch (error) {
      console.log(error);
    }
  },
};

const editMentor = {
  type: MentorType,
  args: {
    name: { type: GraphQLString },
    rollNumber: { type: new GraphQLNonNull(GraphQLString) },
    contact: { type: GraphQLString },
    email: { type: GraphQLString },
    prefect: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
  },
  async resolve(
    parents,
    { name, rollNumber, contact, email, prefect, isActive }
  ) {
    try {
      const mentor = await Mentor.findOneAndUpdate(
        { rollNumber },
        {
          $set: {
            name,
            contact,
            email,
            prefect,
            isActive,
          },
        },
        {
          omitUndefined: true,
          new: true,
          runValidators: true,
        }
      );

      return await mentor.save();
    } catch (error) {
      console.log(error);
    }
  },
};

const removeMentor = {
  type: MentorType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(parent, { id }) {
    await Mentor.findByIdAndDelete(id, (error, docs) => {
      if (error) {
        console.log(error);
      }

      return docs;
    });
  },
};

module.exports = { addMentor, editMentor, removeMentor };
