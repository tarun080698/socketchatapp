import React from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Auth from "./components/pages/Auth";
import * as ChatActions from "./store/actions/chatActions";

class App extends React.Component {
  state = {
    msg: "",
  };
  componentDidMount() {
    this.props.setupSocket();
  }

  render() {
    return (
      <div className="App">
        {/* <input
          type="text"
          onChange={(e) => {
            this.setState({ msg: e.target.value });
          }}
        ></input>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (this.props.socket) {
              this.props.socket.send(
                JSON.stringify({
                  type: "msg",
                  data: this.state.msg,
                })
              );
            }
          }}
        >
          Send Message
        </button>*/}
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Auth} />
            <Route path="/signup" component={Auth} />
            <Route
              path="/"
              render={(props) => {
                if (!this.props.token) {
                  return <Redirect to="/login" />;
                } else return <h1>Root</h1>;
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
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
