"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {PulseOx} from './PulseOx'
import {BloodPressure} from './BloodPressure'
import {PatientInfo} from './PatientInfo'
import {Graph} from './SpGraph'

export class PatientVitals extends React.Component {
  render () {
    return (
      <div className="container twitchSearchApp">
         <div className="row">
        <div className="stuff">
          <ul id="streamerList" className="list-group">
            <li className="list-group-item streamers">
              <a>
               <PatientInfo spo={this.props.spo} mrn={this.props.mrn} fullname={this.props.fullname}  age={this.props.age} />
                <PulseOx spo={this.props.spo} />
                <BloodPressure  dia={this.props.dia} sys={this.props.sys} />
                <Graph  lower={this.props.lower} upper={this.props.upper} dataGraph={this.props.dataGraph}  />
              </a>
               
            </li>
          </ul>
        </div>
      </div>
      </div>
    );
  }
}
