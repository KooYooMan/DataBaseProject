import React from 'react';
import Home from './Home/Home.js';
import Student from './Student/Student.js';
import Lecturer from './Lecturer/Lecturer.js';
import StudentID from './Student/StudentID.js';
import HomeStudent from './Student/HomeStudent.js';
import { connect } from 'react-redux';
import { Transition } from 'react-spring/renderprops';
import StudentExam from './Student/StudentExam.js';

class Main extends React.Component {
    renderedScreen = (id, props) => {
        switch (id) {
            case 0:
                return <Home style={props} />
            case 1:
                return <StudentID style={props} />
            case 2:
                return <Lecturer style={props} />
            case 3:
                return <HomeStudent style={props} />
            case 4: 
                return <StudentExam style={props} />
            case 5:
                return <Student style={props} />
            default:
                return <h1>Error Rendering</h1>
        }
    }

    render() {
        return (
            <Transition
                items={this.props.screen}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}
                config={{
                    duration: 500
                }}
            >
                {
                    screen => props => this.renderedScreen(screen, props)
                }
            </Transition>
        );
    }
}

const mapStatetoProps = function (store) {
    return {
        screen: store.indexScreen.get('screen')
    };
}

export default connect(mapStatetoProps)(Main);