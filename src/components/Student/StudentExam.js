import React from "react";
import { connect } from "react-redux";
import actions from "../../actions/index-screen-actions";
import Schedule from "../Schedule/Schedule";
import Student from "../Student/Student.js";
import homeStudentScreen from "../Student/HomeStudent.js";
import axios from "axios";
import "./StudentExam.scss";

class BackButton extends React.Component {
  render() {
    return (
      <a className="back-button" onClick={this.props.backButton}>
        <i
          className="button__icon fa fa-arrow-left"
          style={{ padding: "5px" }}
        ></i>
        <span className="button__text">Trở lại</span>
      </a>
    );
  }
}

class StudentExam extends React.Component {
  render() {
    return (
      <div>
        <BackButton backButton={this.props.backButton} />
        <h1>Alo Alo</h1>
      </div>
    );
  }
}

class Home extends React.Component {
  state = {
    screen: 4,
  };

  backButton = () => {
    this.setState({
      screen: 4,
    });
  };

  renderedScreen = (id) => {
    switch (id) {
      case 4:
        return (
          <StudentExam
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            resetInput={this.resetInput}
            backButton={this.props.backButton}
          />
        );
      // case 1:
      //   return (
      //     <StudentExam
      //       listUser={this.state.users}
      //       backButton={this.backButton}
      //       studentID={this.state.studentID}
      //     />
      //   );
    }
  };

  render() {
    return (
      <div style={(this.props.style, { height: "100%" })}>
        {this.renderedScreen(this.state.screen)}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    homeStudentScreen: () => dispatch(actions.homeStudentScreen),
  };
};

export default connect(null, mapDispatchToProps)(Home);
