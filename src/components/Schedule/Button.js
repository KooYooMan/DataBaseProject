import React from 'react';
import './Button.scss';

class Button extends React.Component {
    render() {
        return (
            <div className="container">
                <div class="button-wrapper">
                    <a class="background-button" href="#" title="Back"></a>
                </div>
                <div class="button-wrapper">
                    <a class="background-button" href="#" title="Export"></a>
                </div>
            </div>
        );
    }
}

export default Button;