import React from "react";
import "./Table.scss";

const TableBody = (props) => {
  var result = [];
  var resultDay = [];
  var currentDay = "",
    currentShift = -1;
  for (var i = 0; i < props.listSubject.length; ++i) {
    var item = props.listSubject[i];
    if (currentDay !== item.day && currentDay !== "") {
      for (var j = currentShift + 1; j <= 4; ++j)
        resultDay.push(<td style={{padding: '10px'}} key={j}></td>);
      result.push(<tr key={currentDay}>{resultDay}</tr>);
      resultDay = [];
      currentShift = -1;
    }
    if (currentDay !== item.day) {
      resultDay.push(<td style={{padding: '10px'}} key={0}>{item.day}</td>);
      currentShift = 0;
    }
    for (var k = currentShift + 1; k < item.shift; ++k)
      resultDay.push(<td style={{padding: '10px'}} key={k}></td>);
    resultDay.push(
      <td style={{padding: '10px'}} key={item.shift} id={"subject-" + item.id}>
        <div style={{ fontWeight: "bold" }}>
          {item.start}
          <br></br> <br></br>
          {item.courseName} ({item.classID})
        </div>
        <br></br>
        {item.auditorium} {item.examType}
        <br></br>
      </td>
    );
    currentDay = item.day;
    currentShift = item.shift;
  }

  for (var j = currentShift + 1; j <= 4; ++j) resultDay.push(<td style={{padding: '10px'}} key={j}></td>);
  result.push(<tr key={currentDay}>{resultDay}</tr>);
  return <tbody className="tbody" style={{maxHeight: 'calc(100vh - 100px)'}}>{result}</tbody>;
};

class ExamTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listSubject: [],
    };
  }

  render() {
    return (
      <div className="container" style={{padding: '20px'}}>
        <table id="schedule-table">
          <thead>
            <tr>
              <th></th>
              <th>Ca 1</th>
              <th>Ca 2</th>
              <th>Ca 3</th>
              <th>Ca 4</th>
            </tr>
          </thead>
          <TableBody listSubject={this.props.listSubject} />
        </table>
      </div>
    );
  }
}

export default ExamTable;
