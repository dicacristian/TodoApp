import React, { useState, useEffect } from "react";
import "./todoapp.css";
import axios from "axios";
import SearchField from "react-search-field";

function TodoApp() {
  const [task, setTask] = useState("");
  const [tasklist, setTaskList] = useState([]);
  const [searchList, setSearchList] = useState("");
  const [search1, setSearch1] = useState("");

  const search = (e) => {
    const searchWord = e.target.value;
    setSearch1(searchWord);
    const newFilter = tasklist.filter((value) => {
      return value.name.includes(searchWord);
    });
    setSearchList(newFilter);
  };

  const refresh = (e) => {
    const searchWord = e;
    setSearch1(searchWord);
    const newFilter = tasklist.filter((value) => {
      return value.name.includes(searchWord);
    });
    setSearchList(newFilter);
  };
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
        const newSearchList = [...searchList];
        if (newSearchList.length > 0) {
          const element = newSearchList.findIndex((elem) => elem.id == id);

          newSearchList[element] = {
            ...newSearchList[element],
            isDone: !done,
          };
          setSearchList(newSearchList);
        }
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
        setSearchList(searchList.filter((t) => t.id !== id));
      });
  };

  return (
    <div className="content">
      {setTaskList != 0 && (
        <input
          type="text"
          placeholder="Search task.."
          onChange={(e) => search(e)}
          value={search1}
          required
        ></input>
      )}
      <ul>
        {searchList.length > 0 && search1.length > 0
          ? searchList.map((t, key) => (
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
          : search1.length > 0 && <h2 style={tStyle}>Task does not exist!</h2>}
      </ul>
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
          <h2 style={tStyle}>Task does not exist!</h2>
        )}
      </ul>
    </div>
  );
}

export default TodoApp;
