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
    }

    setScreen(idScreen) {
        this.setState({
            screen: idScreen,
        });
    }

    renderedScreen(screen) {
        if (screen === 0) return <Home setScreen={this.setScreen}/>
        else if (screen === 1) return <Student setScreen={this.setScreen}/>
        else if (screen === 2) return <Lecturer setScreen={this.setScreen}/>
    }

    render() {
        return(
            this.renderedScreen(this.state.screen)
        );
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);
  