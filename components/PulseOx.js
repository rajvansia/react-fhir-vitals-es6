"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

const styleHigh = {
  color: 'red'
};

const styleNormal = {
  color: "rgb(0,255,0)"
};

export class PulseOx extends React.Component {
	
  render () {
    return (
    			<div>
              <span className="streamerName">SPO2</span>
              <span style={this.props.spo>=95 ? styleNormal : styleHigh} className="number">{this.props.spo}%</span>
              </div>
    );
  }
}

