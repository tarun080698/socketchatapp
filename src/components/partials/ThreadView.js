import { connect } from "formik";
import React from "react";
import { withRouter } from "react-router-dom";

function ThreadView() {
  return <div>hello thread</div>;
}

const mapStateToProps = (state) => ({
  ...state.auth,
  ...state.chat,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ThreadView));
