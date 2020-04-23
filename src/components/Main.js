import React from 'react';
import Home from './Home/Home.js';
import Student from './Student/Student.js';
import Lecturer from './Lecturer/Lecturer.js';
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