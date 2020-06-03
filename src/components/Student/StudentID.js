import React from "react";
import { connect } from "react-redux";
import actions from "../../actions/index-screen-actions";
import Student from "../Student/Student.js";
import HomeStudent from "../Student/HomeStudent.js";
import axios from "axios";
import fetchingStudentData from "./../../Utility/fetchingStudentData";
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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.studentInput = React.createRef();
  }

  componentDidMount() {
    this.studentInput.current.focus();
    var input = document.getElementById("name");
    input.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        console.log("da enter roi nhe š");
        event.preventDefault();
        document.getElementById("myBtn").click();
      }
    });
    this.props.resetInput();
  }

  render() {
    return (
      <div id="studentID">
        <div className="screen">
          <BackButton homeScreen={this.props.homeScreen} />
          <div className="input-form">
            <h1>NHẬP MÃ SINH VIÊN</h1>
            <div className="input-field">
              <div className="form__group field">
                <input
                  type="number"
                  className="form__field"
                  name="name"
                  id="name"
                  maxLength="8"
                  onChange={this.props.handleChange}
                  placeholder="du con di~ me"
                  autoComplete="off"
                  ref={this.studentInput}
                  required
                />
                <label htmlFor="name" className="form__label">
                  Mã sinh viên
                </label>
              </div>
              <button
                className="button-submit"
                id="myBtn"
                onClick={this.props.handleSubmit}
              >
                Nhập
              </button>
            </div>
            {this.props.statusID === 1 ? (
              <p>Mã sinh viên không tồn tại</p>
            ) : this.props.statusID === 2 ? (
              <p>Đang tải dữ liệu...</p>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

class StudentID extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.backButton = this.backButton.bind(this);
    this.resetInput = this.resetInput.bind(this);
    this.resetData = this.resetData.bind(this);
  }

  state = {
    screen: 1,
    empty: true,
    statusID: 0,
    studentID: "",
    listSubject: [],
    listExam: [],
    listSchedule: [],
    // listSubject: [
    //   {
    //     id: 0,
    //     courseID: "Mã môn học",
    //     classID: "Mã lớp học",
    //     className: "Tên môn học",
    //     group: 1,
    //     period: "7-9",
    //     dayOfWeek: 3,
    //     auditorium: "207-GĐ3",
    //     statusID: false,
    //   },
    //   {
    //     id: 1,
    //     courseID: "Mã môn học",
    //     classID: "Mã lớp học2222",
    //     className: "Tên môn học",
    //     group: 2,
    //     period: "7-9",
    //     dayOfWeek: 7,
    //     auditorium: "201-GĐ3",
    //     statusID: false,
    //   },
    // ],
  };

  componentDidMount() {
    this.resetData();
    fetch("https://uet-schedule.herokuapp.com/schedule/getAll") //Du lieu tong hop
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          listSchedule: result.scheduleList,
        });
      })
      .catch((err) => {
        alert("Unable to fetch data");
      });
  }

  resetInput() {
    this.setState({
      studentID: "",
    });
  }

  resetData() {
    this.setState({
      listSubject: [],
      listExam: [],
      studentID: "",
      statusID: 0,
      empty: false,
    });
  }

  handleChange(event) {
    if (event.target.value.length > event.target.maxLength) {
      event.target.value = event.target.value.slice(0, event.target.maxLength);
    }
    this.setState({
      studentID: event.target.value,
      statusID: 0,
    });
  }

  handleSubmit() {
    console.log("da enter");

    let listSubject1 = [];
    let listSubject2 = [];
    let listTemp = [];
    let listExamTemp = [];
    let done = false;
    if (this.state.studentID.length === 8) {
      this.setState({
        statusID: 2,
      });
      /*fetchingStudentData(this.state.studentID).then((result) => {
        //list mon hoc tam thoi
        listTemp = result;
        listTemp.sort((a, b) => a.classID - b.classID);
        listExamTemp = listTemp;
        done = true;
        for (var i = 0; i < listTemp.length; i++) {
          if (listTemp[i].group !== "CL") {
            listTemp.push({
              classID: listTemp[i].classID,
              group: "CL",
            });
          }
        }
        listExamTemp.sort((a, b) => a.classID - b.classID);
        console.log("listTemp: " + this.state.studentID);
        console.log(listTemp);
        console.log("result: " + this.state.studentID);
        console.log(result);*/
      if (/*result.status !== "Error"*/ true) {
        // lay lich hoc -----------------------------------------------------------------------
        axios
          .get(
            `https://uet-schedule.herokuapp.com/student/getSchedule?studentID=${this.state.studentID}`
          )
          .then((result) => {
            if (result.data.scheduleList.length !== 0) {
              console.log("data duy");
              console.log(result.data.scheduleList);
              listSubject1 = result.data.scheduleList; //list mon hoc lay tu database
              this.setState({
                listSubject: listSubject1,
                empty: false,
                screen: 3,
                statusID: 0,
              });
              console.log("main:");
              console.log(this.state.listSubject);
            }
          })
          .catch((err) => {
            // console.log(err.response);
            console.log("loi me may roi");
            this.setState({
              empty: true,
            });
            //-----------------------------------------
            /*for (var i = 0; i < listTemp.length; i++) {
                for (var j = 0; j < this.state.listSchedule.length; j++) {
                  if (
                    listTemp[i].classID ===
                      this.state.listSchedule[j].classID &&
                    listTemp[i].group === this.state.listSchedule[j].group
                  ) {
                    listSubject2.push({
                      courseID: this.state.listSchedule[j].courseID,
                      classID: this.state.listSchedule[j].classID,
                      group: this.state.listSchedule[j].group,
                      className: this.state.listSchedule[j].className,
                      dayOfWeek: this.state.listSchedule[j].dayOfWeek,
                      period: this.state.listSchedule[j].period,
                      auditorium: this.state.listSchedule[j].auditorium,
                      error: false,
                    });
                  }
                }
              }*/

            this.setState({
              // listSubject: listSubject2,
              listSubject: [],
              screen: 3,
              statusID: 0,
            });
            console.log("main:");
            console.log(this.state.listSubject);
          });

        //Ket thuc lay lich hoc ------------------------------------------------------
      } else {
        //co loi
        this.setState({
          statusID: 1,
        });
      }
      // });
      // .catch((err2) => {
      //   //ma sinh vien k ton tai
      //   console.log("loiiiiiiiiiiiiiiiiiiiiiiiiii")
      //   this.setState({
      //     statusID: true,
      //   });
      // });
    } else alert("nhập mã sinh viên đúng vào nhé bạn yêu ☻");
  }

  backButton = () => {
    this.setState({
      screen: 1,
      listSubject: [],
    });
  };

  renderedScreen = (id) => {
    switch (id) {
      case 1: //it self
        return (
          <Home
            homeScreen={this.props.homeScreen}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            resetInput={this.resetInput}
            statusID={this.state.statusID}
          />
        );
      case 3:
        return (
          <HomeStudent
            listUser={this.state.listSubject}
            listExam={this.state.listExam}
            backButton={this.backButton}
            studentID={this.state.studentID}
          />
        );
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
    homeScreen: () => dispatch(actions.homeScreen),
  };
};

export default connect(null, mapDispatchToProps)(StudentID);
