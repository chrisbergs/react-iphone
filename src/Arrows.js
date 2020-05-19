import React from "react";
import "./Arrows.css";

class Arrows extends React.Component {
  render() {
    return (
      <div className="Arrow-Wrapper">
        <div className="Volume-Arrow">
          <p>Justera volymen</p>
          <i className="fas fa-long-arrow-alt-right"></i>
        </div>
        <div className="Standby-Arrow">
          <p>Av/På</p>
          <i className="fas fa-long-arrow-alt-left"></i>
        </div>
      </div>
    );
  }
}

export default Arrows;
