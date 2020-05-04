import React from 'react';
import actions from '../../actions/index-screen-actions';
import { connect } from 'react-redux';
import './Lecturer.scss';
import axios from 'axios';
import Schedule from '../Schedule/Schedule'

class BackButton extends React.Component {
    render() {
        return (
            <div className="back-button-container">
                <a className="back-button" onClick={this.props.homeScreen}>
                    <i className="button__icon fa fa-arrow-left" style={{ padding: '5px' }}></i>
                    <span className="button__text">Back</span>
                </a>
            </div>
        );
    }
}

const Suggestion = (props) => {
    const renderList = props.list.map(value => (
        <button key={value} onClick={() => props.changeInput(value)} className="button-render-list" style={{ border: 'none' }}>{value}</button>
    ))

    return (
        <div className="suggestion-container">
            <div className="button-suggestion" style={{ overflowY: 'scroll' }}>
                {renderList}
            </div>
        </div>
    );
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listLecturer: [],
            inputValue: '',
            screen: 0,
            renderSubject: []
        }
        this.nameInput = React.createRef();
        this.changeInput = this.changeInput.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.backButton = this.backButton.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    backButton = () => {
        this.setState({
            screen: 0
        })
    }

    componentDidMount() {
        this.nameInput.current.focus();
        var input = document.getElementById("input-content");
        input.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("myBtn").click();
            }
        });

    }

    changeInput = (value) => {
        this.setState({
            inputValue: value,
            listLecturer: [],
            renderSubject: []
        })
        document.getElementById("input-content").value = value;
        this.nameInput.current.focus();
    }

    submitHandler = () => {
        axios.post('https://uet-schedule.herokuapp.com/lecturer/getSchedule', {
            name: document.getElementById("input-content").value
        })
        .then((result) => {
            this.setState({
                screen: 1,
                renderSubject: result.data.scheduleList
            })
        })
        .catch(() => {
            this.setState({
                screen: 2
            })
        });
    }

    handleInputChange = (event) => {
        event.preventDefault()
        var text = event.target.value;
        this.setState({
            inputValue: text
        })
        var newlistLecturer = this.props.listLecturer.filter(value => {
            return value.includes(text)
        })
        if (newlistLecturer.length <= 20) {
            this.setState({
                listLecturer: newlistLecturer
            })
        } else {
            this.setState({
                listLecturer: []
            })
        }
    }

    render() {
        switch (this.state.screen) {
            case 0:
                return (
                    <div id="lecturer-container">
                        <div className="container">
                            <BackButton
                                homeScreen={this.props.homeScreen}
                            />
                            <h1 style={{ padding: '100px', textAlign: 'center' }} >Search Lecturer's Name</h1>
                            <div className="input">
                                <div className="input-container">
                                    <input
                                        className="input-field"
                                        placeholder="Enter Lecturer's name"
                                        ref={this.nameInput}
                                        style={{ color: 'black', fontFamily: "'Open Sans', sans-serif" }}
                                        id="input-content"
                                        onChange={this.handleInputChange}
                                        autoComplete="off"
                                    />
                                    <div className="input-field-shadow" />
                                    <div className="submit-container">
                                        <input className="submit-btn"
                                            type="submit"
                                            onClick={this.submitHandler}
                                            id="myBtn"
                                        />
                                    </div>
                                </div>
                                <Suggestion
                                    list={this.state.listLecturer}
                                    changeInput={this.changeInput}
                                />
                            </div>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <Schedule
                        listSubject={this.state.renderSubject}
                        backButton={this.backButton}
                    />
                )
            case 2:
                return (
                    <div>
                        <button onClick={this.backButton}>Back</button>
                        <h1>Error: Can't render schedule table</h1>
                    </div>
                )
        }
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        homeScreen: () => dispatch(actions.homeScreen)
    }
}

export default connect(null, mapDispatchToProps)(Home); 