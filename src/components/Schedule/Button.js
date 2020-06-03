import React from 'react';
import './Button.scss';

class Button extends React.Component {
    render() {
        return (
            <div id="lecturer-menu-buttons">
                <div className="container">
                    <div className="button-wrapper">
                        <a className="background-button" onClick={this.props.backButton} href="#" title="Trở về"></a>
                    </div>
                    <div className="button-wrapper">
                        <a className="background-button" onClick={this.props.exportPNG} href="#" title="Lưu ảnh"></a>
                    </div>
                    <div className="button-wrapper">
                        <a className="background-button" onClick={this.props.exportGoogleCalandar} href="#" title="Lưu Google Calandar"></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Button;