import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "50vh",
    width: 280,
    margin: "20px auto",
    background: "linear-gradient(to right, #4568dc, #b06ab3 )",
  };
  const btnstyle = { margin: "8px 0" };
  const tipographyStyle = {
    color: "white",
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

  const [emailLogIn, setEmailLogIn] = useState("");
  const [passwordLogIn, setPasswordLogIn] = useState("");

  let sendLogIn = () => {
    axios
      .post("https://todo-application-2.herokuapp.com/loginPerson", {
        email: emailLogIn,
        password: passwordLogIn,
      })
      .then((res) => {
        if (typeof res.data === "object") {
          window.localStorage.setItem("personId", res.data.id);
          window.location = "/todoapp";
        } else {
          window.location = "/login";
        }
      });
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <h2 style={tipographyStyle}>Log In</h2>
        </Grid>
        <TextField
          label="Email"
          placeholder="Enter Email"
          onChange={(e) => setEmailLogIn(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
          onChange={(e) => setPasswordLogIn(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button
          type="button"
          color="secondary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={() => sendLogIn()}
        >
          Sign in
        </Button>

        <Typography style={tipographyStyle}>
          {" "}
          Do you have an account ?<Link href="/register">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
