import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/register/Register.js";
import Login from "./components/login/LogIn.js";
import ToDoApp from "./components/todoApp/ToDoApp.js";
import { Typography } from "@material-ui/core";

function App() {
  const aStyle = {
    color: "black",
    marginLeft: "40%",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  };
  const bStyle = {
    marginLeft: "40%",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    color: "black",
  };

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/">
            <ToDoApp />
            {/* <a style={aStyle} href="/register">
              You don't have an account. Please register here
            </a> */}
            {/* <p style={bStyle}>
              <a href="/login">
                {""}
                If you had an account.Please Login Here.
              </a>
            </p> */}
          </Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/todoapp" component={ToDoApp}></Route> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;

// <Router>
// <Switch>
//   <Route exact path="/register" component={Register}></Route>
//   <Route exact path="/login" component={Login}></Route>
//   <Route exact path="/todoapp" component={ToDoApp}></Route>

//   <Route exact path="/">
//     <a href="/register">Register</a>
//     <a href="/login">Log In</a>
//     <a href="/todoapp">To do App</a>
//   </Route>
// </Switch>
// </Router>
