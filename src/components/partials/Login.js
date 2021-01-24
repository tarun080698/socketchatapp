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
      margin: theme.spacing(1),
    },
  },
}));

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();
  return (
    <div className="form-wrapper">
      <Paper elevation="4">
        <div className="login-form">
          <Typography variant="h3" component="h1" className="heading">
            WELCOME
          </Typography>
          <br />
          <form
            className={classes.root}
            Validate
            onSubmit={(e) => {
              e.preventDefault();
              if (username !== "" && password !== "") {
                console.log(username, password);
              }
            }}
          >
            <TextField
              id="filled-basic"
              label="Username"
              variant="filled"
              type="string"
              onChange={(e) => setUsername(e.target.value)}
              fullWidth="true"
              name="username"
            />
            <br />
            <TextField
              id="filled-basic"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              variant="filled"
              type="string"
              name="password"
              fullWidth="true"
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="btn-lg-su"
              //   fullWidth="true"
              style={{
                padding: "10px 100px",
                margin: "10px 60px",
                fontSize: "12px",
              }}
              //   onClick={(e) => e.preventDefault()}
            >
              Login
            </Button>
          </form>
          <div>
            <p>
              Need an Account?
              <Link variant="body2" color="textPrimary">
                <Link to="/signup">Click here to Create an account </Link>
              </Link>
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
