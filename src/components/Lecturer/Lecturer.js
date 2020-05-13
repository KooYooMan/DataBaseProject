import React from 'react';
import { connect } from 'react-redux';
import './Lecturer.scss';
import Home from './Home';
import actions from '../../actions/index-screen-actions'

class Lecturer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: 0,
            listLecturer: []
        }
    }

    componentDidMount() {
        fetch('https://uet-schedule.herokuapp.com/lecturer/getAll')
            .then((result) => result.json())
            .then(
                (result) => {
                    this.setState({
                        screen: 0,
                        listLecturer: result.lecturerList
                    })
                }
            ).catch(err => {
                this.setState({
                    screen: 1
                })
            })
    }

    renderedScreen = (id) => {
        switch (id) {
            case 0:
                return (
                    <Home
                        listLecturer={this.state.listLecturer}
                        style={this.props.style}
                    />
                )
            case 1:
                return (
                    <div>
                        <h1>Không lấy được dữ liệu từ server</h1>
                        <button onClick={this.props.homeScreen}>Back</button>
                    </div>
                );
            default:
                return (
                    <div>
                        <h1>Lỗi hiển thị</h1>
                        <button onClick={this.props.homeScreen}>Back</button>
                    </div>
                );
        }
    }

    render() {
        return (
            <div style={this.props.style}>
                {this.renderedScreen(this.state.screen)}
            </div>
        );
    }
}

const mapDispatchtoProps = (dispatch, ownProps) => {
    return {
        homeScreen: () => dispatch(actions.homeScreen)
    }
}

export default connect(null, mapDispatchtoProps)(Lecturer); 