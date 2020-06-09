import React from "react";
import "./home.scss";
import { connect } from "react-redux";
import actions from "../../actions/index-screen-actions";

class Home extends React.Component {
  render() {
    document.getElementById("root").style.height = "100%";
    document.getElementById("root").style.margin = "auto";
    return (
      <div id="home-component" style={this.props.style}>
        <div className="container">
          <button className="card" onClick={this.props.studentIDScreen}>
            <h2>Học sinh</h2>
            <i className="fas fa-arrow-right" />
            <div className="pic" />
            <button></button>
          </button>
          <button className="card card2" onClick={this.props.lecturerScreen}>
            <h2>Giảng viên</h2>
            <i className="fas fa-arrow-right" />
            <div className="pic" />
            <button></button>
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    studentIDScreen: () => dispatch(actions.studentIDScreen),
    lecturerScreen: () => dispatch(actions.lecturerScreen),
  };
};

export default connect(null, mapDispatchToProps)(Home);
