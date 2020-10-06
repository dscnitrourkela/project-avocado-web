const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
} = require('graphql');
const Mentor = require('../models/mentor');
const Mentee = require('../models/mentee');
const Coordinator = require('../models/coordinator');
const Prefect = require('../models/prefect');
const {
  CoordinatorType,
  PrefectType,
  MentorType,
  MenteeType,
} = require('./types');

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
        const checkMentee = await Mentee.exists({ rollNumber });

        if (checkMentee) {
          throw new Error(
            'Mentee is already exists!'
          );
        }

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
        contact: { type: GraphQLInt },
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
        const checkMentor = await Mentor.exists({ rollNumber });

        if (checkMentor) {
          throw new Error(
            'Mentor is already exists!'
          );
        }

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
        contact: { type: new GraphQLNonNull(GraphQLInt) },
        rollNumber: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        designation: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { name, contact, email, designation, rollNumber }) {
        const checkCoordinator = await Coordinator.exists({ rollNumber });

        if (checkCoordinator) {
          throw new Error(
            'Coordinator is already exists!'
          );
        }

        const coordinator = new Coordinator({
          name,
          contact,
          email,
          designation,
          rollNumber,
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
        id: { type: new GraphQLNonNull(GraphQLString) },
        contact: { type: GraphQLInt },
        email: { type: GraphQLString },
        designation: { type: GraphQLString },
      },
      async resolve(parent, { name, contact, email, designation, id }) {
        const coordinator = await Coordinator.findByIdAndUpdate(id, {
          $set: {
            name,
            contact,
            email,
            designation,
          },
        });

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
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { id }) {
        await Coordinator.findByIdAndDelete(id, (error, docs) => {
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
        contact: { type: new GraphQLNonNull(GraphQLInt) },
        rollNumber: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        coordinator: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { name, contact, email, coordinator, rollNumber }) {
        const checkPrefect = await Prefect.exists({ rollNumber });

        if (checkPrefect) {
          throw new Error(
            'Prefect is already exists!'
          );
        }

        const prefect = new Prefect({
          name,
          contact,
          email,
          coordinator,
          rollNumber,
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
        contact: { type: GraphQLInt },
        email: { type: GraphQLString },
        coordinator: { type: GraphQLString },
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { name, contact, email, coordinator, id }) {
        const prefect = await Prefect.findByIdAndUpdate(id, {
          $set: {
            name,
            contact,
            email,
            coordinator,
          },
        });

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
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { id }) {
        await Prefect.findByIdAndDelete(id, (error, docs) => {
          if (error) {
            console.log(error);
          }

          return docs;
        });
      },
    },
  },
});

module.exports =  mutation;
