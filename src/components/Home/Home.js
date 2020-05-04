import React from 'react';
import './home.scss';
import { connect } from 'react-redux';
import actions from '../../actions/index-screen-actions';

class Home extends React.Component {
    render() {
        document.getElementById('root').style.height="100%";
        document.getElementById('root').style.margin="auto";
        return (
            <div id="home-component">
                <div className="container">
                <button className="card" onClick={this.props.studentScreen}>
                    <h2>Student</h2>
                    <i className="fas fa-arrow-right" />
                    <div className="pic" />
                    <ul>
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    </ul>
                    <button></button>
                </button>
                <button className="card card2" onClick={this.props.lecturerScreen}>
                    <h2>Lecturer</h2>
                    <i className="fas fa-arrow-right" />
                    <div className="pic" />
                    <ul>
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    </ul>
                    <button></button>
                </button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        studentScreen : () => dispatch(actions.studentScreen),
        lecturerScreen : () => dispatch(actions.lecturerScreen)
    }
}

export default connect(null, mapDispatchToProps)(Home);
