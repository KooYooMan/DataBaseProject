import React, { useRef } from 'react';
import './Schedule.scss';
import Table from './Table';
import Button from './Button';
import CourseList from './CourseList';
import { exportComponentAsJPEG, exportComponenstAsPDF, exportComponentAsPNG } from "react-component-export-image";
import { Spring } from 'react-spring/renderprops'

class googleCalendar {
    constructor(credentials) {
        //load dependencies...
        this.gapi = window.gapi;
        this.gapi.load("client:auth2", init.bind(this));
        let cal = this;
        //create call stack...
        this.callStack = {};
        function init() {
            //authorize api access...
            this.gapi.client
                .init({
                    apiKey: credentials.apiKey,
                    clientId: credentials.clientId,
                    scope: credentials.scope,
                    discoveryDocs: credentials.discoveryDocs
                })
                .then(function () {
                    cal.gapi.auth2.getAuthInstance().isSignedIn.listen(updateCallstack);
                    function updateCallstack() {
                        cal.callStack.func(cal.callStack.args);
                    }
                });
        }
    }

    userAuthStatus() {
        if (!this.gapi.auth2.getAuthInstance().isSignedIn.get()) {
            this.gapi.auth2.getAuthInstance().signIn();
        }
        return this.gapi.auth2.getAuthInstance().isSignedIn.get();
    }

    createEvent(events) {
        if (this.userAuthStatus()) {
            events.map(event => {
                let request = this.gapi.client.calendar.events.insert({
                    calendarId: "primary",
                    resource: event
                });
                request.execute(() => { });
            })
            alert("done");
        } else {
            this.callStack.func = this.createEvent.bind(this);
            this.callStack.args = events
        }
    }
}

class Schedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listSubject: [],
        }
        this.exportGoogleCalandar = this.exportGoogleCalandar.bind(this)
    }

    process(s) {
        var foo = s.split('-')
        return [parseInt(foo[0]), parseInt(foo[1])]
    }

    WorkingCalandarConvert(data) {
        var result = data.map(value => ({
            'summary': `${value.courseName} - ${value.classID} - ${((value.group === 'CL') ? value.group : 'N' + value.group)}`,
            'location': `${value.auditorium}`,
            'start': {
                'dateTime': `2020-03-${value.dayOfWeek}T${value.start + 6}:00:00+07:00`,
                'timeZone': 'Asia/Saigon',
            },
            'end': {
                'dateTime': `2020-03-${value.dayOfWeek}T${value.finish + 6}:50:00+07:00`,
                'timeZone': 'Asia/Saigon',
            },
            'recurrence': [
                'RRULE:FREQ=WEEKLY;COUNT=15'
            ],
        }))
        return result
    }

    ExamCalandarConvert(data) {
        var covertShiftToHour = (shift) => {
          switch(shift) {
            case 1:
              return '09';
            case 2:
              return '11';
            case 3:
              return '15';
            default:
              return '17';
          }
        }
        var result = data.map(value => ({
          'summary': `${value.courseName} - ${value.classID}`,
          'location': `${value.auditorium}`,
          'start': {
            'dateTime': `2020-${value.day.substr(3, 2)}-${value.day.substr(0, 2)}T${value.start.substr(0, 2)}:${value.start.substr(3, 2)}:00+07:00`,
            'timeZone': 'Asia/Saigon',
          },
          'end': {
            'dateTime': `2020-${value.day.substr(3, 2)}-${value.day.substr(0, 2)}T${covertShiftToHour(value.shift)}:00:00+07:00`,
            'timeZone': 'Asia/Saigon',
          },
        }))
    }

    exportGoogleCalandar() {
        var events = ((this.props.listSubject.type === 'Working')
        ? this.WorkingCalandarConvert(this.state.listSubject) 
        : this.ExamCalandarConvert(this.state.listSubject));
        window.googleCalendar.createEvent(events);
    }

    componentDidMount() {
        var listSubject = []
        for (var i = 0; i < this.props.listSubject.length; ++i) {
            var value = this.props.listSubject[i]
            if (this.props.listSubject.type === "Working") {
                listSubject.push({
                    courseName: value.className,
                    id: i,
                    classID: value.classID,
                    auditorium: value.auditorium,
                    dayOfWeek: value.dayOfWeek,
                    start: this.process(value.period)[0],
                    finish: this.process(value.period)[1],
                    group: value.group
                })
            } else {
                listSubject.push({
                    courseName: value.className,
                    id: i,
                    classID: value.classID,
                    auditorium: value.auditorium,
                    shift: value.shift,
                    start: value.start,
                    day: value.day,
                    examType: value.examType
                })
            }
        }
        this.setState({
            listSubject: listSubject
        })
        let credentials = {
            scope:
                "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
            clientId:
                "314262756986-dphbp3k9g7htuqp4fm3398sof8v66bkr.apps.googleusercontent.com",
            apiKey: "AIzaSyBNTqxm5ivV1wZR24Sq9s9V7VmiRpzz5Is",
            discoveryDocs: [
                "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
            ]
        };
        window.googleCalendar = new googleCalendar(credentials);
    }

    render() {
        var componentRef = React.createRef();
        return (
            <Spring
                from={{
                    opacity: 0,
                    transform: 'translate3d(400px,0,0) scale(0.5) rotateX(90deg)'
                }}
                to={{
                    opacity: 1,
                    transform: 'translate3d(0px,0,0) scale(1) rotateX(0deg)'
                }}
                config={{
                    duration: 1000
                }}
            >
                {
                    props => (
                        <React.Fragment>
                            <div id="lecturer" style={props}>
                                <input id="menu__toggle" type="checkbox" className="menu__toggle" />
                                <label htmlFor="menu__toggle" className="menu__toggle-label">
                                    <svg preserveAspectRatio="xMinYMin" viewBox="0 0 24 24">
                                        <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
                                    </svg>
                                    <svg preserveAspectRatio="xMinYMin" viewBox="0 0 24 24">
                                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                    </svg>
                                </label>
                                <div id="lecturer-menu">
                                    <Button
                                        backButton={this.props.backButton}
                                        exportPNG={() => {
                                            document.getElementById("menu__toggle").checked = false;
                                            for (var i = 0; i < document.getElementsByTagName('td').length; ++i) {
                                                var element = document.getElementsByTagName('td')[i]
                                                element.style.backgroundColor = "darkorchid"
                                            }
                                            setTimeout(() => {
                                                exportComponentAsJPEG(componentRef)
                                                for (var i = 0; i < document.getElementsByTagName('td').length; ++i) {
                                                    var element = document.getElementsByTagName('td')[i]
                                                    element.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
                                                }
                                            }, 2000)
                                        }}
                                        exportGoogleCalandar={this.exportGoogleCalandar}
                                    />
                                    <CourseList
                                        listSubject={this.state.listSubject}
                                        type={this.props.listSubject.type}
                                    />
                                </div>
                                <div id="lecturer-table-container">
                                    <Table
                                        listSubject={this.state.listSubject}
                                        type={this.props.listSubject.type}
                                        ref={componentRef}
                                    />
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }
            </Spring>
        );
    }
}

export default Schedule;