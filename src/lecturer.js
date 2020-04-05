import React from 'react';

class Lecturer extends React.Component {
    render() {
        return ((this.props.screen !== 2) ? <div></div> :
            <h1>Lecturer</h1>
        );
    }
}

export default Lecturer;