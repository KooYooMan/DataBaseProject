import React from 'react';
import './home.scss';

function Box(props) {
    return (
        <div className="el">
            <button onClick={props.onClick}>
                <img src={props.imgSrc} alt=""></img>
            </button>
            <div className="el__index">
                <div className="el__index-back">
                    {props.content}
                </div>
                <div className="el__index-front">
                    <div className="el__index-overlay" data-index={props.content}>
                        {props.num}
                    </div>
                </div>
            </div>
        </div>
    );
}

class Home extends React.Component {
    render() {
        return ((this.props.screen !== 0) ? <div></div> :
            <div class="home-background">
                <div className="cont s--inactive">
                    <div className="cont__inner">
                        <Box 
                            content="Student" 
                            imgSrc="./image/student.jpg" 
                            num="1" 
                            onClick={this.props.studentScreen}
                        />
                        <Box 
                            content="Lecturer" 
                            imgSrc="./image/lecturer.webp" 
                            num="2" 
                            onClick={this.props.lecturerScreen}
                        />
                        <h2>oh-la-la</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;