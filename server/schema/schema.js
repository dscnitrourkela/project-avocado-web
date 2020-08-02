const graphql = require('graphql');
const Mentor = require('../models/mentor');
const Mentee = require('../models/mentee');
const Coordinator = require('../models/coordinator');
const Prefect = require('../models/prefect');
const { resolve } = require('path');

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
    rollNumber: { type: GraphQLString },
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
    contact: { type: GraphQLString },
    email: { type: GraphQLString },
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
        mentor: { type: new GraphQLNonNull(GraphQLID) },
        contact: { type: new GraphQLNonNull(GraphQLInt) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { name, rollNumber, mentor, contact, email }) {
        const mentee = new Mentee({
          name,
          rollNumber,
          mentor,
          contact,
          email,
        });

        try {
          return await mentee.save();
        } catch (error) {
          console.log(error);
        }
      },
    },
    editMentee: {
      type: MenteeType,
      args: {
        name: { type: GraphQLString },
        rollNumber: { type: new GraphQLNonNull(GraphQLString) },
        mentor: { type: GraphQLString },
        contact: { type: GraphQLString },
        email: { type: GraphQLString },
      },

      async resolve(parent, { name, rollNumber, mentor, contact, email }) {
        const mentee = await Mentee.findOneAndUpdate(
          { rollNumber },
          {
            $set: {
              name,
              mentor,
              contact,
              email,
            },
          }
        );

        try {
          return await mentee.save();
        } catch (error) {
          console.log(error);
        }
      },
    },
    removeMentee: {
      type: MenteeType,
      args: {
        rollNumber: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { rollNumber }) {
        await Mentee.findOneAndDelete({ rollNumber }, (error, docs) => {
          if (error) {
            console.log(error);
          }

          return docs;
        });
      },
    },
    addMentor: {
      type: MentorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        rollNumber: { type: new GraphQLNonNull(GraphQLString) },
        contact: { type: new GraphQLNonNull(GraphQLInt) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        prefect: { type: new GraphQLNonNull(GraphQLString) },
        coordinator: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(
        parent,
        { name, rollNumber, contact, email, prefect, coordinator }
      ) {
        const mentor = new Mentor({
          name,
          rollNumber,
          contact,
          email,
          prefect,
          coordinator,
        });

        try {
          return await mentor.save();
        } catch (error) {
          console.log(error);
        }
      },
    },
    editMentor: {
      type: MentorType,
      args: {
        name: { type: GraphQLString },
        rollNumber: { type: new GraphQLNonNull(GraphQLString) },
        contact: { type: GraphQLInt },
        email: { type: GraphQLString },
        prefect: { type: GraphQLString },
        coordinator: { type: GraphQLString },
      },
      async resolve(
        parents,
        { name, rollNumber, contact, email, prefect, coordinator }
      ) {
        const mentor = await Mentor.findOneAndUpdate(
          { rollNumber },
          {
            $set: {
              name,
              mentor,
              contact,
              email,
              prefect,
              coordinator,
            },
          }
        );

        try {
          return await mentor.save();
        } catch (error) {
          console.log(error);
        }
      },
    },
    removeMentor: {
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
    },
    addCoordinator: {
      type: CoordinatorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        rollNumber: { type: new GraphQLNonNull(GraphQLString) },
        contact: { type: new GraphQLNonNull(GraphQLInt) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        designation: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { name, rollNumber, contact, email, designation }) {
        const coordinator = new Coordinator({
          name,
          rollNumber,
          contact,
          email,
          designation,
        });

        try {
          return await coordinator.save();
        } catch (error) {
          console.log(error);
        }
      },
    },
    editCoordinator: {
      type: CoordinatorType,
      args: {
        name: { type: GraphQLString },
        rollNumber: { type: new GraphQLNonNull(GraphQLString) },
        contact: { type: GraphQLInt },
        email: { type: GraphQLString },
        designation: { type: GraphQLString },
      },
      async resolve(
        parents,
        { name, rollNumber, contact, email, designation }
      ) {
        const coordinator = await Coordinator.findOneAndUpdate(
          { rollNumber },
          {
            $set: {
              name,
              mentor,
              contact,
              email,
              designation,
            },
          }
        );

        try {
          return await coordinator.save();
        } catch (error) {
          console.log(error);
        }
      },
    },
    removeCoordinator: {
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
    },
    addPrefect: {
      type: PrefectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        rollNumber: { type: new GraphQLNonNull(GraphQLString) },
        contact: { type: new GraphQLNonNull(GraphQLInt) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        coordinator: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { name, rollNumber, contact, email, coordinator }) {
        const prefect = new Prefect({
          name,
          rollNumber,
          contact,
          email,
          coordinator,
        });

        try {
          return await prefect.save();
        } catch (error) {
          console.log(error);
        }
      },
    },
    editPrefect: {
      type: PrefectType,
      args: {
        name: { type: GraphQLString },
        rollNumber: { type: new GraphQLNonNull(GraphQLString) },
        contact: { type: GraphQLInt },
        email: { type: GraphQLString },
        coordinator: { type: GraphQLString },
      },
      async resolve(
        parents,
        { name, rollNumber, contact, email, coordinator }
      ) {
        const prefect = await Prefect.findOneAndUpdate(
          { rollNumber },
          {
            $set: {
              name,
              mentor,
              contact,
              email,
              coordinator,
            },
          }
        );

        try {
          return await prefect.save();
        } catch (error) {
          console.log(error);
        }
      },
    },
    removePrefect: {
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
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
