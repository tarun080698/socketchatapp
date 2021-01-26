import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./styles.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}));

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

function Login(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  });

  function validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  }

  function handleSubmit(event) {
    const { errors } = state;
    event.preventDefault();
    if (validateForm(errors)) {
      console.info("Valid Form");
      if (props.socket) {
        props.socket.send(
          JSON.stringify({
            type: "LOGIN",
            data: { email: state.email, password: state.password },
          })
        );
      }
    } else {
      console.info("Invalid Form");
    }
  }

  function handleChange(e) {
    e.preventDefault();
    let fields = state;
    let { errors } = state;
    const { name, value } = e.target;

    switch (name) {
      case "password":
        errors.password =
          value.length < 8 || value.length === 0
            ? "Password must be 8 characters long!"
            : "";
        break;
      case "email":
        errors.email =
          validEmailRegex.test(value) || value.length === 0
            ? ""
            : "Email is not valid!";
        break;
      default:
        break;
    }

    console.log(fields);
    setState({ ...state, errors, [name]: value });
  }

  const classes = useStyles();
  return (
    <div className="form-wrapper">
      <Paper elevation={4}>
        <div className="login-form">
          <Typography variant="h3" component="h1" className="heading">
            WELCOME
          </Typography>
          <form noValidate className={classes.root} onSubmit={handleSubmit}>
            <TextField
              noValidate
              id="filled-basic"
              label="Email"
              variant="filled"
              type="email"
              onChange={handleChange}
              fullWidth={true}
              name="email"
              autoFocus={true}
              autoComplete="off"
              color="secondary"
            />
            {state.errors.email.length > 0 && (
              <span className="error">{state.errors.email}</span>
            )}
            <TextField
              id="filled-basic"
              label="Password"
              onChange={handleChange}
              variant="filled"
              type="password"
              name="password"
              autoComplete="off"
              fullWidth={true}
              color="secondary"
            />
            {state.errors.password.length > 0 && (
              <span className="error">{state.errors.password}</span>
            )}
            <div className="btn">
              <Button
                variant="contained"
                type="submit"
                className="btn"
                style={{ backgroundColor: "#ff005b", color: "whitesmoke" }}
              >
                Login
              </Button>
            </div>
          </form>
          <div>
            <p>
              Need an Account?
              <Link to="/signup">Click here to Create an account </Link>
            </p>
          </div>
        </div>
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => ({
  ...state.auth,
  ...state.chat,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
