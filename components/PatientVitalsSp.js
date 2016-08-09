"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {PulseOx} from './PulseOx'
import {PatientInfo} from './PatientInfo'

export class PatientVitalsSp extends React.Component {
  render () {
    return (
      <div className="container twitchSearchApp">
         <div className="row">
        <div className="stuff">
          <ul id="streamerList" className="list-group">
            <li className="list-group-item streamers">
              <a>
               <PatientInfo spo={this.props.spo} mrn={this.props.mrn} fullname={this.props.fullname}  age={this.props.age}/>
                <PulseOx spo={this.props.spo} />
          
              </a>
            </li>
          </ul>
        </div>
      </div>
      </div>
    );
  }
}


