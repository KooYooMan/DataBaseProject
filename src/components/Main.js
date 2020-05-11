import React from 'react';
import Home from './Home/Home.js';
import Student from './Student/Student.js';
import Lecturer from './Lecturer/Lecturer.js';
import StudentID from './Student/StudentID.js';
import { connect } from 'react-redux';

class Main extends React.Component {
    render() {
        switch (this.props.screen) {
            case 1:
                return (
                    <Student />
                );
            case 2:
                return (
                    <Lecturer />
                );
            case 0:
                return (
                    <Home />
                );
            case 3:
                return (
                    <StudentID />
                )
            default: 
                return (
                    <h1>Error rendering</h1>
                );
        }
    }
}

const mapStatetoProps = function(store) {
    return {
        screen: store.indexScreen.get('screen')
    };
}

export default connect(mapStatetoProps)(Main);