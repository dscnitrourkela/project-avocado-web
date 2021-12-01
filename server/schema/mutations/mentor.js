const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
} = require("graphql");

// Mongoose Models
const Mentor = require("../models/mentor");

// GraphQL Types
const { MentorType } = require("./types");

const addMentor = {
  type: MentorType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    rollNumber: { type: new GraphQLNonNull(GraphQLString) },
    contact: { type: new GraphQLNonNull(GraphQLInt) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    prefect: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, { name, rollNumber, contact, email, prefect }) {
    try {
      const checkMentor = await Mentor.exists({ rollNumber });

      if (checkMentor) {
        throw new Error("Mentor is already exists!");
      }

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
    contact: { type: GraphQLInt },
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
    rollNumber: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, { rollNumber }) {
    await Mentor.findOneAndDelete({ rollNumber }, (error, docs) => {
      if (error) {
        console.log(error);
      }

      return docs;
    });
  },
};

module.exports = { addMentor, editMentor, removeMentor };