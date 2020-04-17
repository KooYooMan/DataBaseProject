import React from 'react';
import actions from '../../actions/index-screen-actions';
import { connect } from 'react-redux';

class Lecturer extends React.Component {
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

export default connect(null, mapDispatchToProps)(Lecturer);