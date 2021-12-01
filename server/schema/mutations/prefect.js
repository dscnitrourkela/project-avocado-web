const { GraphQLString, GraphQLNonNull, GraphQLInt } = require("graphql");

// Mongoose Models
const Prefect = require("../models/prefect");

// GraphQL Types
const { PrefectType } = require("./types");

const addPrefect = {
  type: PrefectType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    rollNumber: { type: new GraphQLNonNull(GraphQLString) },
    contact: { type: new GraphQLNonNull(GraphQLInt) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    year: { type: GraphQLInt },
  },
  async resolve(parent, { name, contact, email, coordinator, rollNumber }) {
    try {
      const checkPrefect = await Prefect.exists({ rollNumber });

      if (checkPrefect) {
        throw new Error("Prefect is already exists!");
      }

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
    contact: { type: GraphQLInt },
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
    rollNumber: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, { rollNumber }) {
    await Prefect.findOneAndDelete({ rollNumber }, (error, docs) => {
      if (error) {
        console.log(error);
      }

      return docs;
    });
  },
};

module.exports = { addPrefect, editPrefect, removePrefect };
