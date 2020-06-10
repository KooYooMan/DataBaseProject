import React from 'react';
import './Table.scss';

const TableBody = (props) => {
    var result = [];
    for (var i = 2; i <= 7; ++i) {
        var inDaySubject = [];
        for (var j = 0; j < props.listSubject.length; ++j) {
            if (props.listSubject[j].dayOfWeek !== i) continue;
            inDaySubject.push(props.listSubject[j])
        }
        var resultDay = [];
        for (j = 0; j <= 12; ++j) {
            var have = false;
            for (var k = 0; k < inDaySubject.length; ++k) {
                if (inDaySubject[k].start === j) {
                    have = true;
                    resultDay.push(
                        <td
                            colSpan={inDaySubject[k].finish - inDaySubject[k].start + 1}
                            id={"subject-" + inDaySubject[k].id}
                            key={"subject-" + inDaySubject[k].id}
                        >
                            <div style={{ fontWeight: 'bold' }}>
                                {inDaySubject[k].courseName} ({inDaySubject[k].classID})
                            </div> 
                            <br></br>
                            {inDaySubject[k].auditorium} ({(inDaySubject[k].group === 'CL' ? 'Cả Lớp' : 'Nhóm ' + inDaySubject[k].group)})
                        </td>
                    )
                    j = inDaySubject[k].finish
                }
            }
            if (have === false) {
                if (j === 0) resultDay.push(<td key={j}>Thứ {i}</td>)
                else resultDay.push(<td key={j}></td>)
            }
        }
        result.push(<tr key={i}>{resultDay}</tr>)
    }
    return <tbody className="tbody" style={{maxHeight: 'calc(100vh - 100px)'}}>{result}</tbody>
}

class WorkingTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listSubject: []
        }
    }

    render() {
        return (
            <div className="container">
                <table id="schedule-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Tiết 1 7AM - 8AM</th>
                            <th>Tiết 2 8AM - 9AM</th>
                            <th>Tiết 3 9AM - 10AM</th>
                            <th>Tiết 4 10AM - 11AM</th>
                            <th>Tiết 5 11AM - 12PM</th>
                            <th>Tiết 6 12PM - 1PM</th>
                            <th>Tiết 7 1PM - 2PM</th>
                            <th>Tiết 8 2PM - 3PM</th>
                            <th>Tiết 9 3PM - 4PM</th>
                            <th>Tiết 10 4PM - 5PM</th>
                            <th>Tiết 11 5PM - 6PM</th>
                            <th>Tiết 12 6PM - 7PM</th>
                        </tr>
                    </thead>
                    <TableBody
                        listSubject={this.props.listSubject}
                    />
                </table>
            </div>
        );
    }
}

export default WorkingTable;