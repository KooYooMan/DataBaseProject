import React from "react";
import { connect } from "react-redux";
import actions from "../../actions/index-screen-actions";
import Schedule from "../Schedule/Schedule";
import Student from "../Student/Student.js";
import axios from 'axios';
import "./StudentID.scss";
class BackButton extends React.Component {
  render() {
    return (
      <a className="back-button" onClick={this.props.homeScreen}>
        <i
          className="button__icon fa fa-arrow-left"
          style={{ padding: "5px" }}
        ></i>
        <span className="button__text">Trở lại</span>
      </a>
    );
  }
}

class StudentID extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.backButton = this.backButton.bind(this)
    this.studentInput = React.createRef();
  }

  state = {
    screen: 3,
    studentID: "",
    listSubject: [],
    users: [
      {
        id: 0,
        courseID: "Mã môn học",
        classID: "Mã lớp học",
        className: "Tên môn học",
        group: 1,
        period: "7-9",
        dayOfWeek: 3,
        auditorium: "207-GĐ3",
        error: false,
      },
      {
        id: 1,
        courseID: "Mã môn học",
        classID: "Mã lớp học2222",
        className: "Tên môn học",
        group: 2,
        period: "7-9",
        dayOfWeek: 7,
        auditorium: "201-GĐ3",
        error: false,
      },
    ],
  };

  componentDidMount() {
    this.studentInput.current.focus();
    var input = document.getElementById("name");
        input.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("myBtn").click();
            }
        });
    //GET data
  }

  handleChange(event) {
    this.studentInput.current.focus();
    event.preventDefault();
    if (event.target.value.length > event.target.maxLength) {
      event.target.value = event.target.value.slice(0, event.target.maxLength)
    }
    this.setState({
      studentID: event.target.value,
    });
    console.log(this.state.studentID);
  }

  handleSubmit(event) {
    this.studentInput.current.focus();
    event.preventDefault();
    // this.setState({
    //   screen: 1,
    // });
    if(this.state.studentID.length === 8){
      axios.get(
        `https://uet-schedule.herokuapp.com/student/getSchedule?studentID=${this.state.studentID}`
      )
        .then((result) => {
          this.setState({
            users: result.data.scheduleList,
            screen: 1,
          });
          console.log(result.scheduleList);
        })
        .catch((err) => {
          console.log(err.response);
          this.setState({
            users: [],
            screen: 1,
          });
        });
      }
      else alert("??");
  }

  backButton = () => {
    this.setState({
      screen: 3,
    });
  };

  render() {
    switch (this.state.screen) {
      case 3:
        return (
          <div id="studentID">
            <div className="screen">
              <BackButton homeScreen={this.props.homeScreen} />
              <div className="input-form">
                <h1>NHẬP MÃ SINH VIÊN</h1>
                <form className="input-field" onSubmit={this.handleSubmit}>
                    <div class="form__group field">
                      <input
                        type="number"
                        class="form__field"
                        name="name"
                        id="name"
                        maxLength= "8"
                        onChange={this.handleChange}
                        placeholder="du con di~ me"
                        autocomplete= "off"
                        ref={this.studentInput}
                        required
                      />
                      <label for="name" class="form__label">
                        Mã sinh viên
                      </label>
                    </div>
                    <button className="button-submit" id="myBtn">
                      Nhập
                    </button>
                </form>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <Student listUser={this.state.users} backButton={this.backButton} studentID={this.state.studentID} />
        );
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    homeScreen: () => dispatch(actions.homeScreen),
  };
};

export default connect(null, mapDispatchToProps)(StudentID);
