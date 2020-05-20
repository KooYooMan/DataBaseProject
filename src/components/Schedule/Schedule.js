import React, { useRef } from 'react';
import './Schedule.scss';
import Table from './Table';
import Button from './Button';
import CourseList from './CourseList';
import { exportComponentAsJPEG, exportComponenstAsPDF, exportComponentAsPNG } from "react-component-export-image";
import { Spring } from 'react-spring/renderprops'

class Schedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listSubject: [],
        }
    }

    process(s) {
        var foo = s.split('-')
        return [parseInt(foo[0]), parseInt(foo[1])]
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
                                        export={() => {
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