import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home';
import Student from './student';
import Lecturer from './lecturer';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: 0,
        }
        this.setScreen = this.setScreen.bind(this)
    }

    setScreen(idScreen) {
        this.setState({
            screen: idScreen,
        });
    }

    render() {
        switch (this.state.screen) {
            case 1:
                return (
                    <Student 
                        screen={this.state.screen}
                        homeScreen={() => this.setScreen(0)} 
                    />
                );
            case 2:
                return (
                    <Lecturer 
                        screen={this.state.screen} 
                        homeScreen={() => this.setScreen(0)}
                    />
                );
            default:
                return (
                    <Home 
                        screen={this.state.screen} 
                        studentScreen={() => this.setScreen(1)} 
                        lecturerScreen={() => this.setScreen(2)} 
                    />
                );
        }
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);
  