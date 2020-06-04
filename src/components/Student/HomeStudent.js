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
        
        className="back-button-flip"
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
    this.state = {
      tempList: [],
      listAllExam: [],
    };
  }

  componentDidMount() {
    //Get All Data  lich thi return listAllExam

    if (this.props.listUser.length !== 0) {
      for (var i = 0; i < this.props.listUser.length; i++) {
        for (var j = 0; j < this.state.listAllExam.length; j++) {
          if (
            this.props.listUser[i].classID ===
              this.state.listAllExam[j].classID &&
            this.props.listUser[i].group === this.state.listAllExam[j].group
          ) {
            this.props.listExam.push({
              classID: this.state.listAllExam[j].classID,
              className: this.state.listAllExam[j].className,
              day: this.state.listAllExam[j].day,
              auditorium: this.state.listAllExam[j].auditorium,
              shift: this.state.listAllExam[j].shift,
              start: this.state.listAllExam[j].start,
              error: false,
            });
          }
        }
      }
    }
  }

  render() {
    return (
      <div className="mainscreen">
        <BackButton backButton={this.props.backButton} />
        <div className="subject">
          <a
            
            className="btn-flip1"
            data-back="bắt đầu"
            data-front="tạo lịch học"
            onClick={() => this.props.changeState(4)}
          ></a>
        </div>
        <div className="exam">
          <a
            
            className="btn-flip2"
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
      return (
        <StudentExam
          backButton={this.backButton}
          listUser={this.state.listUser}
          studentID={this.state.studentID}
        />
      );
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
