import React from "react";
import { connect } from "react-redux";
import actions from "../../actions/index-screen-actions";
import "./Student.scss";
import Schedule from "../Schedule/Schedule";
import StudentID from "../Student/StudentID.js";
import axios from "axios";

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

function convertStringToInt(s) {
  const foo = s.split("-");
  return [parseInt(foo[0]), parseInt(foo[1])];
}

function checkError(data) {
  let n = data.length,
    errorLog = [];
  errorLog.push("");
  for (var i = 0; i < n; i++) {
    errorLog.push(0);
  }

  var i = 0,
    j = 0;
  for (i = 0; i < n - 1; i++) {
    for (j = i + 1; j < n; j++) {
      if (
        data[i].courseID === data[j].courseID &&
        data[i].classID !== data[i].classID
      ) {
        // return [
        //   i,
        //   "Môn hiện tại bạn chọn bị trùng với môn thứ " + (i + 1).toString(),
        // ];
        errorLog[i + 1] = 1;
        errorLog[0] =
          "Môn hiện tại bạn chọn bị trùng với môn thứ " + (i + 1).toString();
      }
      if (
        data[i].classID === data[j].classID &&
        data[i].group !== "CL" &&
        data[j].group !== "CL"
      ) {
        // return [i, "Bạn chỉ có thể chọn 1 lớp cho mỗi môn học"];
        errorLog[i + 1] = 1;
        errorLog[0] = "Bạn chỉ có thể chọn 1 lớp cho mỗi môn học";
      }
      if (data[i].dayOfWeek === data[j].dayOfWeek) {
        let period_i = convertStringToInt(data[i].period);
        let period_j = convertStringToInt(data[j].period);
        let start_i = period_i[0];
        let finish_i = period_i[1];
        let start_j = period_j[0];
        let finish_j = period_j[1];
        if (
          (start_j >= start_i && start_j <= finish_i) ||
          (finish_j >= start_i && finish_j <= finish_i)
        ) {
          // return [
          //   i,
          //   "Môn hiện tại bạn chọn bị trùng thời gian với môn thứ " +
          //     (i + 1).toString() +
          //     " (T" +
          //     data[i].dayOfWeek +
          //     ":" +
          //     data[i].period +
          //     ")",
          // ];
          errorLog[i + 1] = 1;
          errorLog[0] =
            "Môn hiện tại bạn chọn bị trùng thời gian với môn thứ " +
            (i + 1).toString() +
            " (T" +
            data[i].dayOfWeek +
            ":" +
            data[i].period +
            ")";
          // + (j + 1).toString() +
          // " (T" +
          // data[j].dayOfWeek +
          // ":" +
          // data[j].period
        }
      }
    }
  }
  return errorLog;
}

const Suggestion = (props) => {
  if (props.currentInput === "classID") {
    var renderList = props.list.map((value) => (
      <button
        onClick={() => props.changeInput(value)}
        className="button-suggest"
      >
        {value.classID + " - " + value.className}
      </button>
    ));
  }
  return (
    <div className="suggestion_flex" style={{ overflowY: "scroll" }}>
      {renderList}
    </div>
    // </div>
  );
};

const SuggestionTH = (props) => {
  var value_hidden = [];
  if (props.currentInput === "group") {
    // props.list.map((value) =>{
    //   if(value.group ==="CL") props.changeInput_Hidden(value);
    // })
    for (var i = 0; i < props.list.length; i++) {
      if (props.list[i].group === "CL") {
        value_hidden = props.list[i];
      }
    }

    if (props.list.length === 1) {
      props.changeInput(props.list[0]);
    } else {
      var renderList = props.list.map((value) =>
        value.group !== "CL" ? (
          <button
            onClick={() => {
              props.changeInput(value);
              props.changeInput_Hidden(value_hidden);
            }}
            className="button-suggest"
          >
            {" "}
            {value.group +
              " (T" +
              value.dayOfWeek +
              ":" +
              value.period +
              ")"}{" "}
          </button>
        ) : null
      );
      // renderList.map(0, 1);
    }
  }

  return (
    <div className="suggestion_flex" style={{ overflowY: "scroll" }}>
      {renderList}
    </div>
    // </div>
  );
};

class Student extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.changeInput_Hidden = this.changeInput_Hidden.bind(this);
    this.makeListTH = this.makeListTH.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.resetFormState = this.resetFormState.bind(this);
    this.handleSubmitTKB = this.handleSubmitTKB.bind(this);
    this.resetSubject = this.resetSubject.bind(this);

    this.state = {
      studentID: this.props.studentID,
      screen: 1,
      currentInput: "",
      courseID: "",
      maSV: "",
      classID: "",
      className: "",
      group: "",
      period: "",
      dayOfWeek: "",
      auditorium: "",
      group_hidden: "",
      period_hidden: "",
      dayOfWeek_hidden: "",
      auditorium_hidden: "",
      error_type: "",
      error_detect: false,
      listSchedule: [], //tong hop dong cut :)
      listSuggestion: [],
      temp: [],
      listThucHanh: [],
      users: this.props.listUser || [],
      enrollList: [],
    };
  }

  backButton = () => {
    this.setState({
      screen: 1,
    });
  };

  makeListTH = (value) => {
    var list = this.state.listSchedule.filter((item) => {
      return item.classID === value;
    });
    this.setState({
      listThucHanh: list,
    });
  };

  changeInput_Hidden = (item) => {
    this.setState({
      group_hidden: item.group,
      period_hidden: item.period,
      dayOfWeek_hidden: item.dayOfWeek,
      auditorium_hidden: item.auditorium,
    });
  };

  changeInput = (item) => {
    //xoa suggestion
    this.setState({
      listSuggestion: [],
    });

    if (this.state.currentInput === "classID") {
      this.setState({
        classID: item.classID,
        className: item.className,
        group: "",
        courseID: item.courseID,
        currentInput: "group",
      });
      this.makeListTH(item.classID);
    } else {
      this.setState({
        group: item.group,
        listThucHanh: [],
        period: item.period,
        dayOfWeek: item.dayOfWeek,
        auditorium: item.auditorium,
      });
    }
    //this.nameInput.current.focus();
  };

  componentDidMount() {
    //GET data
    fetch("https://uet-schedule.herokuapp.com/schedule/getAll")
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          listSchedule: result.scheduleList,
        });
      })
      .catch((err) => {
        alert("Không thể trích xuất dữ liệu lịch học toàn bộ sinh viên");
      });

    //Get student's schedule list
    axios
      .get(
        `https://uet-schedule.herokuapp.com/student/getSchedule?studentID=${this.state.studentID}`
      )
      .then((result) => {
        if (result.data.scheduleList.length !== 0) {
          var temp_listUser = result.data.scheduleList;
          temp_listUser.sort((a, b) => (a.classID > b.classID ? 1 : -1)); //list mon hoc lay tu database
          this.setState({
            users: temp_listUser,
          });
        }
      })
      .catch((err) => {
        alert(
          "Không thể trích xuất dữ liệu của sinh viên" +
            this.state.studentID.toString()
        );
      });
  }

  deleteUser = (key) => {
    let { users } = this.state;
    users.splice(key, 1);
    this.setState({
      users: [...users],
    });
  };

  handleChange(event) {
    event.preventDefault();
    var text = event.target.value;
    this.setState({
      [event.target.name]: text,
      currentInput: event.target.name,
      error_detect: false,
      error_type: 0,
      errorLog: [],
    });

    {
      this.state.users.map((user, key) => {
        //Reset error status
        user.error = false;
      });
    }

    if (this.state.currentInput === "group") {
      this.makeListTH(this.state.classID);
    }

    const list = this.state.listSchedule.filter((value) => {
      if (value.classID != null)
        var subClassID = value.classID.toString().toLowerCase();
      if (value.className != null)
        var subClassName = value.className.toString().toLowerCase();
      if (text != null) var subText = text.toString().toLowerCase().trim();
      return subClassID.includes(subText) || subClassName.includes(subText);
    });

    var reducedList = Object.values(
      list.reduce((r, o) => {
        r[o.classID] = o;
        return r;
      }, {})
    );

    if (reducedList.length <= 30) {
      this.setState({
        listSuggestion: reducedList,
      });
    } else {
      this.setState({
        listSuggestion: [],
      });
    }
  }

  resetSubject(){
    axios
    .get(
      `https://uet-schedule.herokuapp.com/student/getDefaultSchedule?studentID=${this.state.studentID}`
    )
    .then((result) => {
      if (result.data.scheduleList.length !== 0) {
        var temp_listUser = result.data.scheduleList;
        temp_listUser.sort((a, b) => (a.classID > b.classID ? 1 : -1)); //list mon hoc lay tu database
        this.setState({
          users: temp_listUser,
        });
      }
    })
    .catch((err) => {
      alert(
        "Không thể trích xuất dữ liệu của sinh viên" +
          this.state.studentID.toString()
      );
    });
  }

  resetFormState() {
    document.querySelector("input[name=classID]").value = "";
    this.setState({
      currentInput: "",
      courseID: "",
      classID: "",
      className: "",
      group: "",
      period: "",
      dayOfWeek: "",
      auditorium: "",
      group_hidden: "",
      period_hidden: "",
      dayOfWeek_hidden: "",
      auditorium_hidden: "",
      error_detect: false,
      error_type: 0,
      errorLog: [],
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let classID = this.state.classID;
    let group = this.state.group;
    let className = this.state.className;
    let courseID = this.state.courseID;
    let period = this.state.period;
    let dayOfWeek = this.state.dayOfWeek;
    let auditorium = this.state.auditorium;
    let sub_Users = this.state.users;

    if (sub_Users.length !== 0) {
      //Them mon thu nhat
      if (group !== "")
        sub_Users = [
          ...sub_Users,
          {
            id: sub_Users[sub_Users.length - 1].id + 1,
            classID,
            className,
            group,
            courseID,
            period,
            dayOfWeek,
            auditorium,
            error: false,
          },
        ];
      //Them mon thu hai
      if (this.state.group_hidden !== "")
        sub_Users = [
          ...sub_Users,
          {
            id: sub_Users[sub_Users.length - 1].id + 1,
            classID,
            className,
            group: this.state.group_hidden,
            courseID,
            period: this.state.period_hidden,
            dayOfWeek: this.state.dayOfWeek_hidden,
            auditorium: this.state.auditorium_hidden,
            error: false,
          },
        ];
    } else {
      //Them mon thu nhat
      if (group !== "")
        sub_Users = [
          ...sub_Users,
          {
            id: 0,
            classID,
            className,
            group,
            courseID,
            period,
            dayOfWeek,
            auditorium,
            error: false,
          },
        ];
      //Them mon thu hai
      if (this.state.group_hidden !== "")
        sub_Users = [
          ...sub_Users,
          {
            id: 1,
            classID,
            className,
            group: this.state.group_hidden,
            courseID,
            period: this.state.period_hidden,
            dayOfWeek: this.state.dayOfWeek_hidden,
            auditorium: this.state.auditorium_hidden,
            error: false,
          },
        ];
    }

    let errorLog = checkError(sub_Users);
    if (errorLog[0] !== "") {
      let { users } = this.state;
      errorLog.forEach((element, index) => {
        if (index > 0 && element === 1) {
          if (users[index - 1] !== undefined) users[index - 1].error = true;
          else alert(index - 1);
        }
      });

      this.setState({
        error_detect: true,
        error_type: errorLog[0],
        users,
      });
    } else {
      this.setState({
        users: sub_Users,
      });
      this.resetFormState();
    }
  }

  handleSubmitTKB() {
    this.setState({
      screen: 6,
    });
    const postEnrollList = this.state.users.map((user) => {
      return { classID: user.classID, group: user.group };
    });
    axios
      .post("https://uet-schedule.herokuapp.com/student/submitClass", {
        studentID: this.state.studentID,
        enrollList: postEnrollList,
      })
      .catch((err) => {
        alert(err.response);
      });
  }

  render() {
    var data = this.state.users;
    data.type = "Working";
    if (this.state.screen === 1) {
      return (
        <div id="student-component">
          <div className="screen">
            <div className="screen_header">
              <BackButton backButton={this.props.backButton} />
              <p className="studentID_text">
                Mã sinh viên: {this.state.studentID}
              </p>
            </div>
            <div className="screen_container">
              <form onSubmit={this.handleSubmit}>
                <div className="container">
                  <h1 style={{ textAlign: "center" }}>TÌM MÔN HỌC</h1>
                  <div className="input_flex">
                    <input
                      type="search"
                      id="classID"
                      value={this.state.classID}
                      placeholder="Nhập mã/tên môn học"
                      name="classID"
                      onChange={this.handleChange}
                      required
                      autoComplete="off"
                    />
                    <div>
                      <Suggestion
                        currentInput={this.state.currentInput}
                        list={this.state.listSuggestion}
                        changeInput={this.changeInput}
                      />
                    </div>
                    <input
                      type="search"
                      id="group"
                      value={this.state.group}
                      placeholder="Nhập mã lớp thực hành"
                      name="group"
                      onChange={this.handleChange}
                      required
                      autoComplete="off"
                    />
                    <div>
                      <SuggestionTH
                        currentInput={this.state.currentInput}
                        list={this.state.listThucHanh}
                        changeInput={this.changeInput}
                        changeInput_Hidden={this.changeInput_Hidden}
                      />
                    </div>
                  </div>
                  {this.state.error_type !== 0 ? (
                    <p className="errorText">{this.state.error_type}</p>
                  ) : null}
                  <button type="submit" className="button-add">
                    Thêm
                  </button>
                </div>
              </form>

              <div className="table_flex">
                <Table users={this.state.users} deleteUser={this.deleteUser} />
                
                <div className = "table-footer">
                    <p className = "noticeText">*Lưu ý: danh sách môn học chỉ được lưu sau khi bạn chọn tạo TKB</p>
                    <button
                      type="submit"
                      className="button-reset"
                      onClick={this.resetSubject}
                    >
                      Reset môn học
                    </button>
                    {this.state.users.length !== 0 ? (
                    <button
                      type="submit"
                      className="button-submit"
                      onClick={this.handleSubmitTKB}
                    >
                      Lưu và tạo TKB 
                    </button>
                    ) : null}
                </div>
                
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.screen === 6) {
      return <Schedule listSubject={data} backButton={this.backButton} />;
    } else {
      return <StudentID />;
    }
  }
}

const Table = ({ users = [], deleteUser }) => {
  return (
    <div className="table">
      <div className="table-header">
        <div className="row">
          <div className="column">Mã lớp học</div>
          <div className="column">Tên môn học</div>
          <div className="column">Lớp TH</div>
          <div className="column">Thứ</div>
          <div className="column">Tiết</div>
          <div className="column">Lựa chọn</div>
        </div>
      </div>
      <div className="table-body-scroll">
        <div className="table-body">
          {users.map((user, key) => {
            return (
              <div className={`row ${user.error ? "error" : ""}`}>
                <div className="column">{user.classID}</div>
                <div className="column">{user.className}</div>
                <div className="column">
                  {user.group === "CL" ? user.group : "N" + user.group}
                </div>
                <div className="column">{user.dayOfWeek}</div>
                <div className="column">{user.period}</div>
                <div className="column">
                  <button className="icon">
                    <i
                      className="fas fa-user-minus"
                      onClick={() => deleteUser(key)}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    homeStudentScreen: () => dispatch(actions.homeStudentScreen),
  };
};

export default connect(null, mapDispatchToProps)(Student);
