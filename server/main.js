import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { TasksCollection } from "../imports/api/TasksCollection";
import "../imports/api/TasksPublications";
import "../imports/api/tasksMethods";

const SEED_USERNAME = "admin";
const SEED_PASSWORD = "admin";

// const insertTask = (taskText, user) =>
//   TasksCollection.insertAsync({
//     text: taskText,
//     userId: user._id,
//     createdAt: new Date(),
//   });

Meteor.startup(async () => {
  if (!(await Accounts.findUserByUsername(SEED_USERNAME))) {
    await Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});
