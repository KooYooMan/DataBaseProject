import React from "react";
import { connect } from "react-redux";
import actions from "../../actions/index-screen-actions";
import "./Student.scss";

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
  let n = data.length;
  var i = 0,
    j = 0;
  for (i = 0; i < n; i++) {
    for (j = i + 1; j < n; j++) {
      if (
        data[i].courseID == data[j].courseID &&
        data[i].classID != data[i].classID
      ) {
        return ([i,"Môn hiện tại bạn chọn bị trùng với môn thứ " + (i + 1).toString()]);
        // console.log(
        //   "Bạn bị trùng môn: " +
        //     data[i]["className"] +
        //     ". Vui lòng kiểm tra lại môn học của bạn"
        // );
      }
      if (
        data[i].classID == data[j].classID &&
        data[i].group != "CL" &&
        data[j].group != "CL"
      ) {
        return ([i,"Bạn chỉ có thể chọn 1 lớp cho mỗi môn học"]);
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
          return ([i,"Môn hiện tại bạn chọn bị trùng thời gian với môn thứ " + (i+1).toString()]);
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
  return( [0,0] );
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
    for(var i = 0;i< props.list.length;i++){
      if(props.list[i].group === "CL" ) { value_hidden = props.list[i];}
    }
    var renderList = props.list.map((value) => (
      (value.group !== "CL") 
      ? (<button onClick={() => {props.changeInput(value); props.changeInput_Hidden(value_hidden);}} className="button-suggest"> {value.group} </button>) 
      : (<button className="button-suggest"> {value.group} </button>)
    ));
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

  state = {
    currentInput: "",
    courseID: "",
    maSV: "",
    classID: "",
    tenMH: "",
    group: "",
    period: "",
    dayOfWeek: "",
    group_hidden: "",
    period_hidden: "",
    dayOfWeek_hidden: "",
    error_type: "",
    error_detect: false,
    listSchedule: [], //tong hop dong cut :)
    listSuggestion: [],
    temp: [],
    listThucHanh: [],
    users: [
      {
        id: 0,
        courseID: "Mã môn học",
        classID: "Mã lớp học",
        tenMH: "Tên môn học",
        group: 1,
        period: "7-9",
        dayOfWeek: 3,
        error: false,
      },
      {
        id: 1,
        courseID: "Mã môn học",
        classID: "Mã lớp học",
        tenMH: "Tên môn học",
        group: 2,
        period: "7-9",
        dayOfWeek: 7,
        error: false,
      },
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
    })
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
        tenMH: item.className,
        group: "",
        courseID: item.courseID,
        currentInput: "group",
      });
      this.makeListTH(item.classID);
    } 
    else {
      this.setState({
        group: item.group === "CL" ? "None" : item.group,
        listThucHanh: [],
        period: item.period,
        dayOfWeek: item.dayOfWeek,
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

    {this.state.users.map((user, key) => { //Reset error status
      user.error = false; 
    })}

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
      classID: "",
      group: "",
      tenMH: "",
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const classID = this.state.classID;
    const group = this.state.group;
    const tenMH = this.state.tenMH;
    const courseID = this.state.courseID;
    const period = this.state.period;
    const dayOfWeek = this.state.dayOfWeek;
    const dayOfWeek_hidden = this.state.dayOfWeek_hidden;
    const period_hidden = this.state.period_hidden;
    const group_hidden = this.state.group_hidden;

    let sub_Users = this.state.users;

    if (sub_Users.length !== 0) {
        sub_Users= [
          ...sub_Users,
          {
            id: sub_Users[sub_Users.length - 1].id + 1,
            classID,
            tenMH,
            group,
            courseID,
            period,
            dayOfWeek,
            error: false,
          },
          {
            id: sub_Users[sub_Users.length - 1].id + 2,
            classID,
            tenMH,
            group_hidden,
            courseID,
            period_hidden,
            dayOfWeek_hidden,
            error: false,
          }
        ];
      }
      else {
        sub_Users= [
          ...sub_Users,
          {
            id: 0,
            classID,
            tenMH,
            group,
            courseID,
            period,
            dayOfWeek,
            error: false,
          },
          {
            id: 1,
            classID,
            tenMH,
            group_hidden,
            courseID,
            period_hidden,
            dayOfWeek_hidden,
            error: false,
          }
        ];
    }

    let errorLog = checkError(sub_Users);

    if(errorLog[1] !== 0){
      console.log("abc1");
      console.log(errorLog[0]);
      let {users} = this.state;
      users[errorLog[0]-1].error= true;

      this.setState({
        error_detect: true,
        error_type: errorLog[1],
        users,
      })
    }
    else{
      console.log("abc");
      this.setState({
        users: sub_Users,
      })
      console.log(sub_Users);
      this.resetFormState();
    }
  }

  render() {
    return (
      <div className="screen">
        <BackButton homeScreen={this.props.homeScreen} />
        <div className="screen_container">
          <form onSubmit={this.handleSubmit}>
            <div className="container">
              <h1 style={{ textAlign: "center" }}>Course Search</h1>
              <div className="input_flex">
                <input
                  type="text"
                  value={this.state.maSV}
                  placeholder="Nhập mã sinh viên"
                  name="maSV"
                  onChange={this.handleChange}
                  required
                />
                <input
                  type="text"
                  value={this.state.classID}
                  placeholder="Nhập mã/tên môn học"
                  name="classID"
                  onChange={this.handleChange}
                  required
                />
                <div>
                  <Suggestion
                    currentInput={this.state.currentInput}
                    list={this.state.listSuggestion}
                    changeInput={this.changeInput}
                  />
                </div>
                <input
                  type="text"
                  value={this.state.group}
                  placeholder="Nhập mã lớp thực hành"
                  name="group"
                  onChange={this.handleChange}
                  required
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
              {(this.state.error_type !== 0) ? (<p className="errorText">{this.state.error_type}</p>): (console.log("ok"))}
              <button type="submit" className="button-add">
                Thêm
              </button>
            </div>
          </form>
          <div className="table_flex">
            <Table users={this.state.users} deleteUser={this.deleteUser} />
            <button type="submit" className="button-submit">
              Tạo TKB
            </button>
          </div>
        </div>
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
          <div className="column">Lựa chọn</div>
        </div>
      </div>
      <div className="table-body">
        {users.map((user, key) => {
          return (
            <div className={`row ${user.error? "error": ""  }`}>
              <div className="column">{user.classID}</div>
              <div className="column">{user.tenMH}</div>
              <div className="column">{user.group}</div>
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
