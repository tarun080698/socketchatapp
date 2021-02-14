import { connect } from "formik";
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

class SideBar extends React.Component {
  componentDidMount() {
    console.log("threadview mounted");
  }
  render() {
    return <div> hello sidebar</div>;
  }
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
