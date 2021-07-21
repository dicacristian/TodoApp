import React, { useState, useEffect } from "react";
import "./todoapp.css";
import axios from "axios";

function TodoApp() {
  const [task, setTask] = useState("");
  const [tasklist, setTaskList] = useState([]);
  // const [searchList, setSearchList] = useState("");

  // const search = (e) => {
  //   const searchWord = e.target.value;
  //   setSearchList(searchWord);
  //   const newFilter = task.filter((value) => {
  //     return value.task.toLowerCase().includes(searchWord.toLowerCase());
  //   });

  //   if (searchWord === "") {
  //     setTaskList([]);
  //   } else {
  //     setTaskList(newFilter);
  //   }
  //   const clearInput = () => {
  //     setTaskList([]);
  //     setSearchList("");
  //   };
  // };

  const tStyle = {
    color: "black",
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  useEffect(() => {
    axios
      .get("https://todo-application-2.herokuapp.com/people")
      .then((res) => console.log("after", tasklist));
  }, [tasklist]);

  useEffect(() => {
    axios
      .post("https://todo-application-2.herokuapp.com/actionsOfUser", {
        personId: window.localStorage.getItem("personId"),
      })
      .then((res) => {
        if (res.data.length > 0) {
          setTaskList(res.data);
        }
      });
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem("personId") === null) {
      window.location.href = "/login";
    }
  }, []);

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

  const completeTask = (e, id, done) => {
    console.log(done);
    axios
      .put("https://todo-application-2.herokuapp.com/action", {
        id: id,
        isDone: !done,
      })
      .then((res) => {
        const element = tasklist.findIndex((elem) => elem.id == id);
        const newTaskList = [...tasklist];
        newTaskList[element] = {
          ...newTaskList[element],
          isDone: !done,
        };
        setTaskList(newTaskList);
      });
  };

  const deleteTask = (e, id) => {
    axios
      .delete("https://todo-application-2.herokuapp.com/action", {
        data: {
          id: id,
        },
      })
      .then((res) => {
        console.log("before", tasklist);
        setTaskList(tasklist.filter((t) => t.id !== id));
      });
  };

  return (
    <div className="content">
      {/* <input type="text" placeholder="search tasks..."></input>
      <button>Search Task</button> */}
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
        {tasklist.length > 0 ? (
          tasklist.map((t, key) => (
            <li key={key} className={t.isDone ? "crossText" : "listitem"}>
              {t.name}
              <button className="delete" onClick={(e) => deleteTask(e, t.id)}>
                🗑️
              </button>
              <button
                className="completed"
                onClick={(e) => completeTask(e, t.id, t.isDone)}
              >
                ✅
              </button>
            </li>
          ))
        ) : (
          <h2 style={tStyle}>Nu exista task-uri</h2>
        )}
      </ul>
    </div>
  );
}

export default TodoApp;
