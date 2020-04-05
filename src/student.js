import React from 'react';

class Student extends React.Component {
    render() {
        return ((this.props.screen !== 1) ? <div></div> :
            <h1>Student</h1>
        );
    }
}

export default Student;