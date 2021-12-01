const { GraphQLObjectType } = require("graphql");

// Mutations
const { addMentee, editMentee, removeMentee } = require("./mutations/mentee");
const { addMentor, editMentor, removeMentor } = require("./mutations/mentor");
const {
  addPrefect,
  editPrefect,
  removePrefect,
} = require("./mutations/prefect");
const {
  addCoordinator,
  editCoordinator,
  removeCoordinator,
} = require("./mutations/coordinator");

const mutation = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    // Mentee
    addMentee,
    editMentee,
    removeMentee,
    // Mentor
    addMentor,
    editMentor,
    removeMentor,
    // Prefect
    addPrefect,
    editPrefect,
    removePrefect,
    // Coordinator
    addCoordinator,
    editCoordinator,
    removeCoordinator,
  },
});

module.exports = mutation;
