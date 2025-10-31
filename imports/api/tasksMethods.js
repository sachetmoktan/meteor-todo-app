import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.methods({
  "tasks.insert"(doc) {
    const userId = this.userId;
    return TasksCollection.insertAsync({...doc, userId });
  },
  "tasks.toggleChecked"(data) {
    return TasksCollection.updateAsync(data._id, {
      $set: { isChecked: !data.isChecked },
    });
  },
  "tasks.delete"(_id) {
    return TasksCollection.removeAsync(_id);
  },
});
