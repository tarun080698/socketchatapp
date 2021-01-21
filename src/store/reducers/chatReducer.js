const defaultState = {
  socket: null,
  message: "",
  threads: [],
  currentThread: "",
};

const chat = (state = defaultState, action) => {
  switch (action.type) {
    case "SETUP":
      return {
        ...state,
        socket: action.payload,
      };
    default:
      return state;
  }
};

export default chat;
