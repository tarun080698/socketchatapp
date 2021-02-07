import * as AuthActions from "./authActions";

export const setupSocket = () => {
  return (dispatch) => {
    const socket = new WebSocket("ws://localhost:8081");
    socket.onopen = () => {
      dispatch({
        type: "SETUP",
        payload: socket,
      });
    };
    socket.onmessage = (message) => {
      let data = JSON.parse(message.data);
      switch (data.type) {
        case "LOGGEDIN":
          dispatch(AuthActions.loggedIn(data));
          break;
        case "ERROR":
          if (data.error.code === "LOGIN_FAILED")
            dispatch(AuthActions.logInErr(data));
          else dispatch(AuthActions.signUpErr(data));
          break;
        default:
        //do nothing
      }
    };
  };
};
