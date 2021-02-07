import { connect } from "formik";
import React from "react";
import { withRouter } from "react-router-dom";

function SideBar() {
  return <div> hello sidebar</div>;
}

const mapStateToProps = (state) => ({
  ...state.auth,
  ...state.chat,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SideBar));
