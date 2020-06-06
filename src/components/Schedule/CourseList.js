import React from 'react';
import './CourseList.scss';

const List = (props) => {
    var result = []

    var onMouseFunction = (foo) => {
        return function () {
            if (document.getElementById("subject-" + foo)) {
                document.getElementById("subject-" + foo).style.backgroundColor = "pink";
            }
        }
    }

    var offMouseFunction = (foo) => {
        return function () {
            if (document.getElementById("subject-" + foo)) {
                document.getElementById("subject-" + foo).style.backgroundColor = "";
            }
        }
    }

    for (var i = 0; i < props.listSubject.length; ++i) {
        var item = props.listSubject[i]
        result.push(
            <a href="#0" onMouseOver={onMouseFunction(i)} onMouseLeave={offMouseFunction(i)}>
                <div style={{ fontWeight: 'bold' }}>{item.courseName} - {item.classID}</div>
                {
                    (props.type === 'Working') ?
                        ((item.group === 'CL') ? 'Lý thuyết' : 'Thực hành') :
                        ""
                }
            </a>
        )
    }

    return (
        <div>
            {result}
        </div>
    );
}

class CourseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listSubject: []
        }
    }

    render() {
        return (
            <div id="lecturer-menu-courselist">
                <nav>
                    <ul id="main">
                        <li>
                            <div 
                                style={{
                                    background: '#6bbe92', height: '50px', textAlign: 'center',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                                }}
                            >
                                <span style={{verticalAlign: 'center', display: 'inline-block'}}>Danh Sách Môn Học</span>
                            </div>
                            <ul className="drop scroll-div" 
                                style={{
                                    overflowX: 'hidden',
                                    overflowY: 'scroll'
                                }}
                            >
                                <List
                                    listSubject={this.props.listSubject}
                                    type={this.props.type}
                                />
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default CourseList;