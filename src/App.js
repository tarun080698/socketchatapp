import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Auth from "./components/pages/Auth";
import Messenger from "./components/pages/Messenger";
import SideBar from "./components/partials/SideBar";
import ThreadView from "./components/partials/ThreadView";
import * as ChatActions from "./store/actions/chatActions";
import * as AuthActions from "./store/actions/authActions";

class App extends React.Component {
  componentDidMount() {
    console.log("App mounted");
    this.props.setupSocket();
  }

  render() {
    return (
      <div className="App">
        {this.props.token && (
          <button onClick={this.props.logout}>logout</button>
        )}
        <BrowserRouter>
          <Switch>
            <Route
              path="/login"
              render={(props) => {
                if (this.props.token) return <Redirect to="/" />;
                else return <Auth />;
              }}
            />
            <Route
              path="/signup"
              render={(props) => {
                if (this.props.token) return <Redirect to="/" />;
                else return <Auth />;
              }}
            />
            <Route
              path="/"
              exact
              render={(props) => {
                if (!this.props.token) {
                  return <Redirect to="/login" />;
                  // } else return <Messenger />;
                } else return <ThreadView />;
                // } else return <h1>root</h1>;
              }}
            />

            <Route
              path="/:threadId"
              render={(props) => {
                if (!this.props.token) {
                  return <Redirect to="/login" />;
                } else return <Messenger />;
                // } else return <h1>root</h1>;
              }}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.auth,
  ...state.chat,
});

const mapDispatchToProps = (dispatch) => ({
  setupSocket: () => {
    dispatch(ChatActions.setupSocket());
  },
  logout: () => {
    dispatch(AuthActions.logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
