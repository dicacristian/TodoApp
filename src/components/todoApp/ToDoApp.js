import React, { useState, useEffect } from "react";
import "./todoapp.css";
import axios from "axios";

function TodoApp() {
  const [task, setTask] = useState("");
  const [tasklist, setTaskList] = useState([]);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  useEffect(() => {
    axios
      .get("https://todo-application-2.herokuapp.com/people")
      .then((res) => console.log("after", tasklist));
  }, [tasklist]);

  const AddTask = () => {
    axios
      .post("https://todo-application-2.herokuapp.com/action", {
        name: task,
        isDone: false,
        personId: window.localStorage.getItem("personId"),
      })
      .then((res) => {
        let newTaskList = tasklist.slice();
        newTaskList.push(res.data);
        setTaskList(newTaskList);
        console.log(newTaskList);
      });
  };

  const completeTask = (e, id) => {
    axios
      .put("https://todo-application-2.herokuapp.com/action", {
        id,
        isDone: false,
      })
      .then((res) => console.log(res));
  };

  const deleteTask = (e, id) => {
    console.log(id);
    axios
      .delete("https://todo-application-2.herokuapp.com/action", {
        id: id,
      })
      .then((res) => {
        console.log("before", tasklist);
        setTaskList(tasklist.filter((t) => t.id !== id));
      });
    // const taskDeleted = (e, name) => {
    //   e.preventDefault();
    //   setTaskList(tasklist.filter((t) => t.name !== name));
  };

  return (
    <div className="content">
      <h1 className="title">To Do App</h1>
      <input
        className="inputStyle"
        type="text"
        placeholder="Add a task..."
        name="text"
        id="text"
        required
        onChange={(e) => handleChange(e)}
      ></input>
      <button className="add-button" onClick={AddTask}>
        Add
      </button>
      <ul>
        {tasklist.map((t, key) => (
          <li key={key}>
            {t.name}
            <button className="delete" onClick={(e) => deleteTask(e, t.id)}>
              🗑️
            </button>
            <button
              className="completed"
              onClick={(e) => completeTask(e, t.id)}
            >
              ✅
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
