export const loggedIn = (data) => {
  return (dispatch) => {
    dispatch({
      type: "LOGGEDIN",
      payload: data,
    });
  };
};

export const logout = (data) => {
  return (dispatch) => {
    dispatch({
      type: "LOGGEDOUT",
      payload: null,
    });
  };
};

export const logInErr = (data) => {
  return (dispatch) => {
    dispatch({
      type: "LOGINERR",
      payload: data,
    });
  };
};

export const signUpErr = (data) => {
  return (dispatch) => {
    dispatch({
      type: "SIGNUPERR",
      payload: data,
    });
  };
};
