import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./styles.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Snackbar, Typography } from "@material-ui/core";
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

function Signup(props) {
  useEffect(() => {}, []);

  const [state, setState] = useState({
    name: "",
    email: "",
    userName: "",
    password: "",
    passwordAgain: "",
    errors: {
      name: "",
      email: "",
      userName: "",
      password: "",
      passwordAgain: "",
    },
  });
  const [notif, setNotif] = useState(false);

  const classes = useStyles();

  function validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  }

  useEffect(() => {
    console.log("SIGNUP mounted");
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const { socket, token, err_msg } = props;
    const { errors } = state;
    if (validateForm(errors)) {
      if (socket) {
        socket.send(
          JSON.stringify({
            type: "SIGNUP",
            data: {
              name: state.name,
              userName: state.userName,
              email: state.email,
              password: state.password,
            },
          })
        );
      }
    }
    if (token === null && err_msg !== "") setNotif(true);
  }

  function handleChange(e) {
    e.preventDefault();
    // let fields = state;
    let { errors } = state;
    const { name, value } = e.target;

    switch (name) {
      case "name":
        errors.name =
          value.length < 5 || value.length === 0
            ? "Name must be 5 characters long!"
            : "";
        break;
      case "userName":
        errors.userName =
          value.length < 7 || value.length === 0
            ? "Username must be 7 characters long!"
            : "";
        break;
      case "email":
        errors.email =
          validEmailRegex.test(value) || value.length === 0
            ? ""
            : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 8 || value.length === 0
            ? "Password must be 8 characters long!"
            : "";
        break;
      //   case "passwordAgain":
      //     errors.passwordAgain =
      //       value !== state.password
      //         ? "Password and Confirm Passowrd should match!"
      //         : "";
      //     break;

      default:
        break;
    }

    //   fields.errors = errors
    //   fields[name] = value
    console.log(state);
    setState({ ...state, errors, [name]: value });
  }

  const handleClose = () => {
    setNotif(false);
  };

  return (
    <div className="form-wrapper">
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={notif}
        onClose={handleClose}
        message={props.err_msg}
        key={"bottomRight"}
        autoHideDuration={3000}
      />
      <Paper elevation={4}>
        <div className="login-form">
          <Typography variant="h4" component="h1" className="heading">
            Create Account
          </Typography>

          <form className={classes.root} noValidate onSubmit={handleSubmit}>
            <TextField
              noValidate
              id="filled-basic"
              label="Name"
              variant="filled"
              type="string"
              onChange={handleChange}
              fullWidth={true}
              name="name"
              autoFocus={true}
              color="secondary"
            />
            {state.errors.name.length > 0 && (
              <span className="error">{state.errors.name}</span>
            )}
            <TextField
              noValidate
              id="filled-basic"
              label="Username"
              variant="filled"
              type="string"
              onChange={handleChange}
              fullWidth={true}
              name="userName"
              color="secondary"
            />
            {state.errors.userName.length > 0 && (
              <span className="error">{state.errors.userName}</span>
            )}
            <TextField
              noValidate
              id="filled-basic"
              label="Email"
              variant="filled"
              type="email"
              onChange={handleChange}
              fullWidth={true}
              name="email"
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
              fullWidth={true}
              color="secondary"
            />
            {state.errors.password.length > 0 && (
              <span className="error">{state.errors.password}</span>
            )}
            <TextField
              noValidate
              id="filled-basic"
              label="Confirm Password"
              onChange={handleChange}
              variant="filled"
              type="password"
              name="passwordAgain"
              fullWidth={true}
              color="secondary"
            />
            {state.errors.passwordAgain.length > 0 && (
              <span className="error">{state.errors.passwordAgain}</span>
            )}
            <div className="btn">
              <Button
                variant="contained"
                type="submit"
                className="btn"
                style={{ backgroundColor: "#ff005b", color: "whitesmoke" }}
              >
                Create
              </Button>
            </div>
          </form>
          <div>
            <p>
              Already have an account? <Link to="/login">Log in</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
