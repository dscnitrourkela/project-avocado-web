const {
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

// Mongoose Models
const Mentee = require("../models/mentee");

// GraphQL Types
const { MenteeType } = require("./types");

const addMentee = {
  type: MenteeType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    rollNumber: { type: new GraphQLNonNull(GraphQLString) },
    contact: { type: new GraphQLNonNull(GraphQLInt) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    mentor: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(parent, { name, rollNumber, mentor, contact, email }) {
    try {
      const checkMentee = await Mentee.exists({ rollNumber });

      if (checkMentee) {
        throw new Error("Mentee already exists!");
      }

      const mentee = new Mentee({
        name,
        rollNumber,
        mentor,
        contact,
        email,
      });

      return await mentee.save();
    } catch (error) {
      console.log(error);
    }
  },
};

const editMentee = {
  type: MenteeType,
  args: {
    name: { type: GraphQLString },
    rollNumber: { type: new GraphQLNonNull(GraphQLString) },
    mentor: { type: GraphQLString },
    contact: { type: GraphQLInt },
    email: { type: GraphQLString },
    emoji: { type: GraphQLInt },
  },

  async resolve(parent, { name, rollNumber, mentor, contact, email, emoji }) {
    try {
      const mentee = await Mentee.findOneAndUpdate(
        { rollNumber },
        {
          $set: {
            name,
            contact,
            email,
            mentor,
            emoji,
          },
        }
      );

      return await mentee.save();
    } catch (error) {
      console.log(error);
    }
  },
};

const removeMentee = {
  type: MenteeType,
  args: {
    rollNumber: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, { rollNumber }) {
    try {
      await Mentee.findOneAndDelete({ rollNumber }, (error, docs) => {
        if (error) {
          console.log(error);
        }
        return docs;
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = { addMentee, editMentee, removeMentee };
