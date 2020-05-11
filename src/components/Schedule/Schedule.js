import React, {useRef} from 'react';
import './Schedule.scss';
import Table from './Table';
import Button from './Button';
import CourseList from './CourseList';
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from "react-component-export-image";

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
        console.log(this.props)
        for (var i = 0; i < this.props.listSubject.length; ++ i) {
            var value = this.props.listSubject[i]
            listSubject.push({
                courseName: value.className,
                dayOfWeek: value.dayOfWeek,
                start: this.process(value.period)[0],
                finish: this.process(value.period)[1],
                auditorium: value.auditorium,
                group: value.group,
                id: i,            
                classID: value.classID
            })
        }
        this.setState({
            listSubject: listSubject
        })
    }

    render() {
        var componentRef = React.createRef();
        return (
            <React.Fragment>
            <div id="lecturer">
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
                            for (var i = 0; i <  document.getElementsByTagName('td').length; ++ i) {
                                var element = document.getElementsByTagName('td')[i]
                                element.style.backgroundColor = "darkorchid"
                            }
                            setTimeout(() =>{ 
                                exportComponentAsJPEG(componentRef)
                                for (var i = 0; i <  document.getElementsByTagName('td').length; ++ i) {
                                    var element = document.getElementsByTagName('td')[i]
                                    element.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
                                }
                            }, 2000)
                        }}
                   />
                   <CourseList 
                        listSubject={this.state.listSubject}
                   />
                </div>
                <div id="lecturer-table-container">
                    <Table 
                        listSubject={this.state.listSubject}
                        ref={componentRef}
                    />
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default Schedule;