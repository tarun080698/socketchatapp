import React, { useState, useEffect } from "react";
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
function Signup() {
  useEffect(() => {
    console.log(this.props);
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  return (
    <div className="form-wrapper">
      <Paper elevation="4">
        <div className="login-form">
          <Typography variant="h4" component="h1" className="heading">
            Create an Account here
          </Typography>
          <br />
          <form
            className={classes.root}
            Validate
            onSubmit={(e) => {
              e.preventDefault();
              if (this.props.socket) {
                this.props.socket.send(
                  JSON.stringify({
                    type: "SIGNUP",
                    data: {
                      email: email,
                      password: password,
                    },
                  })
                );
                if (email !== "" && password !== "") {
                  console.log(email, password);
                }
              }
            }}
          >
            <TextField
              id="filled-basic"
              label="Email"
              variant="filled"
              type="string"
              onChange={(e) => setEmail(e.target.value)}
              fullWidth="true"
              name="email"
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
              style={{
                padding: "10px 100px",
                margin: "10px 60px",
                fontSize: "12px",
              }}
            >
              Signup
            </Button>
          </form>
          <div>
            <p>
              Already registered? Click here to
              <Link variant="body2" color="textPrimary">
                <Link to="/login">Log in </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
