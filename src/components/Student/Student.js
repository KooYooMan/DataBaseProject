import React from 'react';
import {connect} from 'react-redux';
import actions from '../../actions/index-screen-actions';
import './Student.scss';

class Student extends React.Component {
    render() {
        return (
            <div id="container"></div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        homeScreen: () => dispatch(actions.homeScreen)
    }
}

export default connect(null, mapDispatchToProps)(Student);