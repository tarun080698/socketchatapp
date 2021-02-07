import { connect } from "formik";
import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import SideBar from "../partials/SideBar";
import ThreadView from "../partials/ThreadView";

class Messenger extends Component {
  render() {
    return (
      <div>
        <SideBar />
        {/* <ThreadView /> */}
      </div>
    );
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
)(withRouter(Messenger));
