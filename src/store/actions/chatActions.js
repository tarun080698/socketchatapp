export const setupSocket = () => {
  return (dispatch) => {
    const socket = new WebSocket("ws://localhost:8081");
    socket.onopen = () => {
      dispatch({
        type: "SETUP",
        payload: socket,
      });
    };
  };
};
