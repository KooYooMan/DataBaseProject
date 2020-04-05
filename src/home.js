import React from 'react';
import './home.scss';

function Box(props) {
    return (
        <div className="el">
            <div class="button-image">
                <button onClick={props.onClick}>
                    <img src={props.imgSrc} alt=""></img>
                </button>
            </div>
            <div className="el__index">
                <div className="el__index-back">{props.content}</div>
                <div className="el__index-front">
                    <div className="el__index-overlay" data-index={props.content}>{props.num}</div>
                </div>
            </div>
        </div>
    );
}

class Home extends React.Component {
    showAlert() {
        alert('hello');
    }

    render() {
        return (
            <div className="cont s--inactive">
                <div className="cont__inner">
                    <Box content="Student" imgSrc="./image/student.jpg" num="1" onClick={this.showAlert}/>
                    <Box content="Lecturer" imgSrc="./image/lecturer.webp" num="2" onClick={this.showAlert}/>
                </div>
            </div>
        );
    }
}

export default Home;