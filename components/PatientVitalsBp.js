"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {BloodPressure} from './BloodPressure'
import {PatientInfo} from './PatientInfo'

export class PatientVitalsBp extends React.Component {
  render () {
    return (
      <div className="container vitalsDash">
         <div className="row">
        <div className="stuff">
          <ul id="streamerList" className="list-group">
            <li className="list-group-item streamers">
              <a>
               <PatientInfo spo={this.props.spo} mrn={this.props.mrn} fullname={this.props.fullname}  age={this.props.age}/>
                <BloodPressure  dia={this.props.dia} sys={this.props.sys}/>
              </a>
               
            </li>
          </ul>
        </div>
      </div>
      </div>
    );
  }
}


