"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

export class PatientInfo extends React.Component {
  render () {
    return (
    			<div>
                <span className="streamerGame"><strong>Name: </strong>{this.props.fullname} |<strong>Age: </strong>{this.props.age} |<strong>MRN:{this.props.mrn} </strong></span>
                <p className="streamTitle"></p>
              </div>
    );
  }
}