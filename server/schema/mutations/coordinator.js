const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
} = require("graphql");

// Mongoose Models
const Coordinator = require("../../models/coordinator");

// GraphQL Types
const { CoordinatorType } = require("../types");

const addCoordinator = {
  type: CoordinatorType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    rollNumber: { type: new GraphQLNonNull(GraphQLString) },
    contact: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    year: { type: GraphQLInt },
  },
  async resolve(parent, { name, contact, email, rollNumber, year }) {
    try {
      const coordinator = new Coordinator({
        name,
        contact,
        email,
        rollNumber,
        year,
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
    contact: { type: GraphQLString },
    email: { type: GraphQLString },
    year: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
  },
  async resolve(parent, { name, contact, email, rollNumber, isActive, year }) {
    try {
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
        },
        {
          omitUndefined: true,
          new: true,
          runValidators: true,
        }
      );

      return await coordinator.save();
    } catch (error) {
      console.log(error);
    }
  },
};

const removeCoordinator = {
  type: CoordinatorType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(parent, { id }) {
    await Coordinator.findByIdAndDelete(id, (error, docs) => {
      if (error) {
        console.log(error);
      }

      return docs;
    });
  },
};

module.exports = { addCoordinator, editCoordinator, removeCoordinator };
