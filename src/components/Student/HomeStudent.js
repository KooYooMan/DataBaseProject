import React from "react";
import { connect } from "react-redux";
import actions from "../../actions/index-screen-actions";
import Student from "./Student";
import StudentExam from "./StudentExam";
import "./HomeStudent.scss";

class BackButton extends React.Component {
  render() {
    return (
      <a
            href="#"
            class="back-button-flip"
            data-back="🡰 Trở lại"
            data-front="🡰 Trở lại"
            onClick={this.props.backButton}
          ></a>
    );
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="mainscreen">
        <BackButton backButton={this.props.backButton} />
        <div className="subject">
          <a
            href="#"
            class="btn-flip1"
            data-back="bắt đầu"
            data-front="tạo lịch học"
            onClick={() => this.props.changeState(4)}
          ></a>
        </div>
        <div className="exam">
          <a
            href="#"
            class="btn-flip2"
            data-back="bắt đầu"
            data-front="tạo lịch thi"
            onClick={() => this.props.changeState(5)}
          ></a>
        </div>
      </div>
    );
  }
}

class HomeStudent extends React.Component {
  constructor(props) {
    super(props);
    this.changeState = this.changeState.bind(this);
    this.backButton = this.backButton.bind(this);
    this.state = {
      screen: 3,
      listUser: this.props.listUser,
      listExam: this.props.listExam,
      studentID: this.props.studentID,
    };
  }

  changeState = (newState) => {
    this.setState({
      screen: newState,
    });
  };

  backButton = () => {
    this.setState({
      screen: 3,
    });
  };

  render() {
    if (this.state.screen === 3) {
      return (
        <Home
          changeState={this.changeState}
          backButton={this.props.backButton}
          listUser={this.props.listUser}
        />
      );
    }
    if (this.state.screen === 4) {
      return (
        <Student
          backButton={this.backButton}
          listUser={this.state.listUser}
          studentID={this.state.studentID}
        />
      );
    }
    if (this.state.screen === 5) {
      return <StudentExam backButton={this.backButton} />;
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    studentIDScreen: () => dispatch(actions.homeStudentScreen),
    studentScreen: () => dispatch(actions.studentScreen),
    studentExamScreen: () => dispatch(actions.studentExamScreen),
  };
};

export default connect(null, mapDispatchToProps)(HomeStudent);
