const defaultState = {
  token: null,
  user: {},
  login_err: {},
  err_msg: "",
  signup_err: {},
};

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case "LOGGEDIN":
      return {
        ...state,
        token: action.payload.data.session.id,
        user: action.payload.data.user,
      };
    case "LOGGEDOUT":
      return {
        ...state,
        ...defaultState,
      };
    case "LOGINERR":
      return {
        ...state,
        login_err: action.payload.error,
        err_msg: "Email or password is incorrect. Please Try again!",
      };
    case "SIGNUPERR":
      console.log();
      return {
        ...state,
        signup_err: action.payload.error,
        err_msg: action.payload.error.details.messages.email[0],
      };
    default:
      return state;
  }
};

export default auth;
