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
        return(
            <div>
                <Home 
                    screen={this.state.screen} 
                    studentScreen={() => this.setScreen(1)} 
                    lecturerScreen={() => this.setScreen(2)} 
                />
                <Student 
                    screen={this.state.screen}
                    homeScreen={() => this.setScreen(0)} 
                />
                <Lecturer 
                    screen={this.state.screen} 
                    homeScreen={() => this.setScreen(0)}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);
  