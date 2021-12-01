const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
} = require("graphql");

// Mongoose Models
const Prefect = require("../../models/prefect");

// GraphQL Types
const { PrefectType } = require("../types");

const addPrefect = {
  type: PrefectType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    rollNumber: { type: new GraphQLNonNull(GraphQLString) },
    contact: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    year: { type: GraphQLInt },
  },
  async resolve(parent, { name, contact, email, coordinator, rollNumber }) {
    try {
      const prefect = new Prefect({
        name,
        contact,
        email,
        coordinator,
        rollNumber,
      });

      return await prefect.save();
    } catch (error) {
      console.log(error);
    }
  },
};

const editPrefect = {
  type: PrefectType,
  args: {
    name: { type: GraphQLString },
    contact: { type: GraphQLString },
    email: { type: GraphQLString },
    year: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
    rollNumber: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, { name, contact, email, isActive, year }) {
    try {
      const prefect = await Prefect.findOneAndUpdate(
        { rollNumber },
        {
          $set: {
            name,
            contact,
            email,
            year,
            isActive,
          },
        },
        {
          omitUndefined: true,
          new: true,
          runValidators: true,
        }
      );

      return await prefect.save();
    } catch (error) {
      console.log(error);
    }
  },
};

const removePrefect = {
  type: PrefectType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(parent, { id }) {
    await Prefect.findByIdAndDelete(id, (error, docs) => {
      if (error) {
        console.log(error);
      }

      return docs;
    });
  },
};

module.exports = { addPrefect, editPrefect, removePrefect };
