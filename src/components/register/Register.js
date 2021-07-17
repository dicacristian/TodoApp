import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { FormControlLabel } from "@material-ui/core";
import axios from "axios";

const Register = () => {
  const paperStyle = {
    background: "linear-gradient(to right, #4568dc, #b06ab3 )",
    padding: "30px 20px",
    width: 400,
    margin: "20px auto",
  };
  const headerStyle = { margin: 0, color: "white" };
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
  const buttonStyle = {
    width: 350,
    margin: "20px",
    root: {
      justifyContent: "center",
    },
  };
  const termensStyle = {
    margin: "10px",
  };
  const StyleSignIn = {
    marginRight: "30px",
    color: "black",
  };

  const [firstNameRegister, setFirstNameRegister] = useState("");
  const [lastNameRegister, setLastNameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");

  let send = () => {
    axios
      .post("https://todo-application-2.herokuapp.com/registerPerson", {
        firstName: firstNameRegister,
        lastName: lastNameRegister,
        email: emailRegister,
        password: passwordRegister,
      })
      .then((res) => {
        if (typeof res.data === "object") {
          window.location = "/login";
        } else {
          window.location = "/register";
        }
      });
  };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>Register</h2>
          <Typography style={tipographyStyle} variant="caption">
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <form>
          <TextField
            fullWidth
            onChange={(e) => setFirstNameRegister(e.target.value)}
            required
            label="First Name"
          ></TextField>
          <TextField
            fullWidth
            onChange={(e) => setLastNameRegister(e.target.value)}
            required
            label="Last name"
          ></TextField>
          <TextField
            fullWidth
            onChange={(e) => setEmailRegister(e.target.value)}
            required
            label="Email"
          ></TextField>
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            onChange={(e) => setPasswordRegister(e.target.value)}
            required
          />
          <FormControlLabel
            style={termensStyle}
            control={<Checkbox name="checkedA" />}
            label="I accept the terms and conditions"
            required
          />

          <Button
            style={buttonStyle}
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => send()}
          >
            REGISTER NOW
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Register;
