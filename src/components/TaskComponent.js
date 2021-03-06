import { useState, useEffect } from "react";
import "../styles/App.scss";
import StatusLine from "./Status";

function TaskComponent(props) {
  const [tasks, setTasks] = useState([]);
  

  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

  function addEmptyTask(status) {
    const lastTask = tasks[tasks.length - 1];

    let newTaskId = 1;

    if (lastTask !== undefined) {
      newTaskId = lastTask.id + 1;
    }

    setTasks((tasks) => [
      ...tasks,
      {
        id: newTaskId,
        title: "",
        description: "",
        urgency: "",
        status: status,
      },
    ]);
  }

  function addTask(taskToAdd) {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskToAdd.id;
    });

    let newTaskList = [...filteredTasks, taskToAdd];

    setTasks(newTaskList);

    saveTasksToLocalStorage(newTaskList);
  }

  function deleteTask(taskId) {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });

    setTasks(filteredTasks);

    saveTasksToLocalStorage(filteredTasks);
  }

  function moveTask(id, newStatus) {
    let task = tasks.filter((task) => {
      return task.id === id;
    })[0];

    let filteredTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    task.status = newStatus;

    let newTaskList = [...filteredTasks, task];

    setTasks(newTaskList);

    saveTasksToLocalStorage(newTaskList);
  }

  function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasksFromLocalStorage() {
    let loadedTasks = localStorage.getItem("tasks");

    let tasks = JSON.parse(loadedTasks);

    if (tasks) {
      setTasks(tasks);
    }
  }

  return (
    <div>
      <div class="topnav">
        <a id="FinFam" href="/profile">
          FinFam
        </a>
        <a id="tasks" href="/tasks">
          My Tasks
        </a>
        <a id="tasks" href="/wishlist">
          My WishList
        </a>
      </div>
      <div className="App">
        <h1>Task Management</h1>
        <main>
          <section>
            <StatusLine
              tasks={tasks}
              addEmptyTask={addEmptyTask}
              addTask={addTask}
              deleteTask={deleteTask}
              moveTask={moveTask}
              status="ToDo"
              
            />
            <StatusLine
              tasks={tasks}
              addEmptyTask={addEmptyTask}
              addTask={addTask}
              deleteTask={deleteTask}
              moveTask={moveTask}
              status="In Progress"
             
            />
            <StatusLine
              tasks={tasks}
              addEmptyTask={addEmptyTask}
              addTask={addTask}
              deleteTask={deleteTask}
              moveTask={moveTask}
              status="Done"
             
            />
          </section>
        </main>
      </div>

     
    </div>
  );
}

export default TaskComponent;
