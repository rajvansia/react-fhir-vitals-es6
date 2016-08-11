"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

const styleHigh = {
  color: 'red'
};

const styleNormal = {
  color: "rgb(0,255,0)"
};

export class BloodPressure extends React.Component {
	
  render () {
    return (
    			<div>
              <span className="vitalNumber">BP</span>
              <span style={this.props.sys<=140 && this.props.sys>=90 && this.props.dia<=90 && this.props.dia>=60 ? styleNormal : styleHigh} className="number">{this.props.sys}/{this.props.dia} mmHg</span>
              </div>
    );
  }
}