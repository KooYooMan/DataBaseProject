import React from 'react';
import './CourseList.scss';

const List = (props) => {
    var result = []

    var onMouseFunction = (foo) => {
        return function() {
            document.getElementById("subject-" + foo).style.backgroundColor = "pink"
        }
    }

    var offMouseFunction = (foo) => {
        return function() {
            document.getElementById("subject-" + foo).style.backgroundColor = ""
        }
    }

    for (var i = 0; i < props.listSubject.length; ++ i) {
        var item = props.listSubject[i]
        result.push(
            <li className="menu-item">
                <a href="#0" onMouseOver={onMouseFunction(i)} onMouseLeave={offMouseFunction(i)}>
                    <div style={{fontWeight: 'bold'}}>{item.courseName} - {item.classID}</div> ({(item.group === 'CL') ? 'Lý thuyết' : 'Thực hành'})
                </a>
            </li>
        )
    }

    return (
        <ol 
            className="sub-menu" 
            style={{ paddingInlineStart: '0px', listStyleType: 'none', overflowY:'scroll', overflowX: 'hidden', height: '280px' }}>
            {result}
        </ol>
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
                <nav className="menu">
                    <ol style={{ paddingInlineStart: '0px' }}>
                        <li className="menu-item">
                            <a href="#0">Danh Sách Môn Học</a>
                            <List 
                                listSubject={this.props.listSubject}
                            />
                        </li>
                    </ol>
                </nav>
            </div>
        );
    }
}

export default CourseList;