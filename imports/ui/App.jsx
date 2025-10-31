import React, { Fragment } from "react";
import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../api/TasksCollection.js";
import { Task } from "./Task.jsx";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { TaskForm } from "./TaskForm.jsx";
import { LoginForm } from "./LoginForm.jsx";

export const App = () => {
  const isLoading = useSubscribe("tasks");

  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();

  const [hideCompleted, setHideCompleted] = React.useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };

  const tasks = useTracker(() => {
    if (!user) {
      return [];
    }
    return TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch();
  });

  const pendingTasksCount = useTracker(() => {
    if (!user) {
      return 0;
    }
    return TasksCollection.find(hideCompletedFilter).count();
  });

  const handleToggleChecked = (data) => {
    return Meteor.callAsync("tasks.toggleChecked", {
      _id: data._id,
      isChecked: data.isChecked,
    });
  };
  const onDeleteClick = (_id) => {
    return Meteor.callAsync("tasks.delete", _id);
  };

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>
        📝️ To Do List {`${pendingTasksCount ? ` (${pendingTasksCount})` : ""}`}
      </h1>

      <div className="app">
        <header>
          <div className="app-bar">
            <div className="app-header">
              <h1>Welcome to Meteor!</h1>
            </div>
          </div>
        </header>

        <div className="main">
          {user ? (
            <Fragment>
              <div className="user" onClick={logout}>
                {user.username} 🚪
              </div>
              <TaskForm />

              <div className="filter">
                <button onClick={() => setHideCompleted(!hideCompleted)}>
                  {hideCompleted ? "Show All" : "Hide Completed"}
                </button>
              </div>

              <ul className="tasks">
                {tasks.map((task) => (
                  <Task
                    key={task._id}
                    task={task}
                    onCheckboxClick={handleToggleChecked}
                    onDeleteClick={onDeleteClick}
                  />
                ))}
              </ul>
            </Fragment>
          ) : (
            <LoginForm />
          )}
        </div>
      </div>
    </>
  );
};
