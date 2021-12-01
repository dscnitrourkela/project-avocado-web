const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
} = require("graphql");

// Mongoose Models
const Coordinator = require("../models/coordinator");

// GraphQL Types
const { CoordinatorType } = require("./types");

const addCoordinator = {
  type: CoordinatorType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    rollNumber: { type: new GraphQLNonNull(GraphQLString) },
    contact: { type: new GraphQLNonNull(GraphQLInt) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    year: { type: GraphQLInt },
  },
  async resolve(parent, { name, contact, email, rollNumber, year }) {
    try {
      const checkCoordinator = await Coordinator.exists({ rollNumber });

      if (checkCoordinator) {
        throw new Error("Coordinator is already exists!");
      }

      const coordinator = new Coordinator({
        name,
        contact,
        email,
        designation,
        rollNumber,
        prefect,
      });

      return await coordinator.save();
    } catch (error) {
      console.log(error);
    }
  },
};

const editCoordinator = {
  type: CoordinatorType,
  args: {
    name: { type: GraphQLString },
    rollNumber: { type: new GraphQLNonNull(GraphQLString) },
    contact: { type: GraphQLInt },
    email: { type: GraphQLString },
    year: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
  },
  async resolve(parent, { name, contact, email, rollNumber, isActive, year }) {
    const coordinator = await Coordinator.findOneAndUpdate(
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

    try {
      return await coordinator.save();
    } catch (error) {
      console.log(error);
    }
  },
};

const removeCoordinator = {
  type: CoordinatorType,
  args: {
    rollNumber: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, { rollNumber }) {
    await Coordinator.findOneAndDelete({ rollNumber }, (error, docs) => {
      if (error) {
        console.log(error);
      }

      return docs;
    });
  },
};

module.exports = { addCoordinator, editCoordinator, removeCoordinator };
