import React, { useState, useEffect } from "react";
import "./todoapp.css";
import axios from "axios";

function TodoApp() {
  const [task, setTask] = useState("");
  const [tasklist, setTaskList] = useState([]);
  const [sendTask, setSendTask] = useState([]);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  useEffect(() => {
    axios
      .get("https://todo-application-2.herokuapp.com/people")
      .then((res) => console.log(res.data));
  }, []);

  const AddTask = () => {
    axios
      .post("https://todo-application-2.herokuapp.com/action", {
        name: task,
        isDone: false,
        personId: window.localStorage.getItem("personId"),
      })
      .then((res) => {
        {
          sendTask.map((a) => {
            <li>{a}</li>;
          });
          console.log(res);
        }
      });
  };

  // am incercat aici

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
    </div>
  );
}

export default TodoApp;
