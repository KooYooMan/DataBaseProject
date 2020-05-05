import React from "react";
import { connect } from "react-redux";
import actions from "../../actions/index-screen-actions";
import "./Student.scss";
import Schedule from "../Schedule/Schedule";

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

function convertStringToInt(s) {
  const foo = s.split("-");
  return [parseInt(foo[0]), parseInt(foo[1])];
}

function checkError(data) {
  console.log(data);
  let n = data.length;
  var i = 0,
    j = 0;
  for (i = 0; i < n; i++) {
    for (j = i + 1; j < n; j++) {
      if (
        data[i].courseID === data[j].courseID &&
        data[i].classID !== data[i].classID
      ) {
        return [
          i,
          "Môn hiện tại bạn chọn bị trùng với môn thứ " + (i + 1).toString(),
        ];
        // console.log(
        //   "Bạn bị trùng môn: " +
        //     data[i]["className"] +
        //     ". Vui lòng kiểm tra lại môn học của bạn"
        // );
      }
      if (
        data[i].classID === data[j].classID &&
        data[i].group !== "CL" &&
        data[j].group !== "CL"
      ) {
        return [
          i,
          "Bạn chỉ có thể chọn 1 lớp cho mỗi môn học"
        ];
        // console.log(
        //   "Hiện tại môn " +
        //     data[i]["className"] +
        //     " của bạn đang ở cả 2 nhóm " +
        //     data[i].group +
        //     " và nhóm " +
        //     data[j].group +
        //     " .Bạn vui lòng kiểm tra lại nhóm lớp học của mình."
        // );
      }
      if (data[i].dayOfWeek == data[j].dayOfWeek) {
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
          return [
            i,
            "Môn hiện tại bạn chọn bị trùng thời gian với môn thứ " +
            (i + 1).toString() + " (T" + data[i].dayOfWeek + ":" + data[i].period + ")",
          ];
          // console.log(
          //   "Bạn có 2 môn bị trùng lịch là: " +
          //     data[i]["className"] +
          //     " và " +
          //     data[j]["className"] +
          //     " vào tiết" +
          //     data[i].period +
          //     " thứ " +
          //     data[i].dayOfWeek
          // );
        }
      }
    }
  }
  return [0, 0];
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
            {value.group + " (T" + value.dayOfWeek + ":" + value.period + ")"}{" "}
          </button>
        ) : (
            <button className="button-suggest"> {value.group} </button>
          )
      );

      renderList.splice(0, 1);
      // var renderList = props.list.filter((value) => 
      //     (value.group !== "CL")
      // );
      //  renderList.map((value) =>
      //    value.group !== "CL" ? (
      //      <button
      //        onClick={() => {
      //          props.changeInput(value);
      //          props.changeInput_Hidden(value_hidden);
      //        }}
      //        className="button-suggest"
      //      >
      //        {" "}
      //        {value.group}{" "}
      //      </button>
      //  ) : (
      //    <button className="button-suggest"> {value.group} </button>
      //    )
      // );

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
  }

  backButton = () => {
    this.setState({
      screen: 0,
    });
  };

  state = {
    screen: 0,
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
    users: [
      // {
      //   id: 0,
      //   courseID: "Mã môn học",
      //   classID: "Mã lớp học",
      //   className: "Tên môn học",
      //   group: 1,
      //   period: "7-9",
      //   dayOfWeek: 3,
      //   auditorium: "207-GĐ3",
      //   error: false,
      // },
      // {
      //   id: 1,
      //   courseID: "Mã môn học",
      //   classID: "Mã lớp học",
      //   className: "Tên môn học",
      //   group: 2,
      //   period: "7-9",
      //   dayOfWeek: 7,
      //   auditorium: "201-GĐ3",
      //   error: false,
      // },
    ],
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
    console.log(item.period + "perioddddd");
    console.log(item.dayOfWeek + "dayyyyyy");
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
        //alert(this.state.listSchedule[0]);
      })
      .catch((err) => {
        alert("bu cu");
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
      if (text != null) var subText = text.toString().toLowerCase();
      return subClassID.includes(subText) || subClassName.includes(subText);
    });

    var reducedList = Object.values(
      list.reduce((r, o) => {
        r[o.classID] = o;
        return r;
      }, {})
    );

    if (reducedList.length <= 20) {
      this.setState({
        listSuggestion: reducedList,
      });
    } else {
      this.setState({
        listSuggestion: [],
      });
    }
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
    console.log(errorLog);
    console.log(sub_Users);
    if (errorLog[1] !== 0) {
      console.log("abc1");
      console.log(errorLog[0]);
      let { users } = this.state;
      if (users[errorLog[0]] !== undefined) users[errorLog[0]].error = true;
      else {
        console.log("djt me may");
        console.log(users[errorLog[0] + 1]);
      }

      this.setState({
        error_detect: true,
        error_type: errorLog[1],
        users,
      });
    } else {
      console.log("abc");
      this.setState({
        users: sub_Users,
      });
      console.log(sub_Users);
      this.resetFormState();
    }
  }

  render() {
    return (
      <div id="student-component">
        {(this.state.screen === 0) ?
          (
            <div className="screen">
              <BackButton homeScreen={this.props.homeScreen} />
              <div className="screen_container">
                <form onSubmit={this.handleSubmit}>
                  <div className="container">
                    <h1 style={{ textAlign: "center" }}>Course Search</h1>
                    <div className="input_flex">
                      <input
                        type="number"
                        value={this.state.maSV}
                        placeholder="Nhập mã sinh viên"
                        name="maSV"
                        onChange={this.handleChange}
                        required
                        autoComplete="off"
                      />
                      <input
                        type="search"
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
                    ) : (
                        console.log("ok")
                      )}
                    <button type="submit" className="button-add">
                      Thêm
                </button>
                  </div>
                </form>
                <div className="table_flex">
                  <Table users={this.state.users} deleteUser={this.deleteUser} />
                  <button
                    type="submit"
                    className="button-submit"
                    onClick={() => {
                      this.setState({ screen: 1 });
                    }}
                  >
                    Tạo TKB
              </button>
                </div>
              </div>
            </div>
          )  : (
            <Schedule listSubject={this.state.users} backButton={this.backButton} />
          )
        }
      </div>
    );
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
      <div className="table-body">
        {users.map((user, key) => {
          return (
            <div className={`row ${user.error ? "error" : ""}`}>
              <div className="column">{user.classID}</div>
              <div className="column">{user.className}</div>
              <div className="column">{user.group}</div>
              <div className="column">{user.dayOfWeek}</div>
              <div className="column">{user.period}</div>
              <div className="column">
                <button className="icon">
                  <i
                    class="fas fa-user-minus"
                    onClick={() => deleteUser(key)}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    homeScreen: () => dispatch(actions.homeScreen),
  };
};

export default connect(null, mapDispatchToProps)(Student);
