import React from 'react';
import './Button.scss';

class Button extends React.Component {
    render() {
        return (
            <div id="lecturer-menu-buttons">
                <div className="container">
                    <div className="button-wrapper">
                        <a className="background-button" onClick={this.props.backButton} href="#" title="Back"></a>
                    </div>
                    <div className="button-wrapper">
                        <a className="background-button" href="#" title="Export"></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Button;