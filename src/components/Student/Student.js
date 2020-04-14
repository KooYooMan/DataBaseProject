import React from 'react';
import {connect} from 'react-redux';
import actions from '../../actions/index-screen-actions';

class Student extends React.Component {
    render() {
        return (
            <button onClick={this.props.homeScreen}>Home Screen</button>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        homeScreen: () => dispatch(actions.homeScreen)
    }
}

export default connect(null, mapDispatchToProps)(Student);