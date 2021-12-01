const { GraphQLObjectType } = require("graphql");

// Mutations
import { addMentee, editMentee, removeMentee } from "./mutations/mentee";
import { addMentor, editMentor, removeMentor } from "./mutations/mentor";
import { addPrefect, editPrefect, removePrefect } from "./mutations/prefect";
import {
  addCoordinator,
  editCoordinator,
  removeCoordinator,
} from "./mutations/coordinator";

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
