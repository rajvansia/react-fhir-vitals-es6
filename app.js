"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {PulseOx} from './components/PulseOx'
import {BloodPressure} from './components/BloodPressure'
import {PatientInfo} from './components/PatientInfo'
import {PatientVitals} from './components/PatientVitals'
import {PatientVitalsSp} from './components/PatientVitalsSp'
import {PatientVitalsBp} from './components/PatientVitalsBp'
import {Graph} from './components/SpGraph'

const channel = 'fhir';
let name=""
let formatted=""   
let mrnum=""   
let age = 0
let dob = ""
let idd = ""
let spo = 0;
let sys = 140;
let dia = 90;
let dataGraph =[]
let upper = []
let lower = []



const   pubnub = PUBNUB({
        publish_key : 'pub-c-3f8a91d6-9bed-4650-baba-c08df033f657',
        subscribe_key : 'sub-c-b6b3acea-5147-11e6-8b3b-02ee2ddab7fe',
        ssl: true
    })
    
const n = 20,
    random = d3.random.normal(96, 2),
    data = d3.range(n).map(random),
    randomSys = d3.random.normal(120, 5),
    randomDia = d3.random.normal(80, 5)
    
class App extends React.Component {
    
constructor(props) {
    super(props);
    this.state = {
      data: [],
      spo: 0,
      fullname:"",
      mrn: "",
      age: 0,
      idd: "9995679",
      dia: 0,
      sys: 0,
      dataGraph : [94,92,95,96,99,100,96,99,98,96,99],
  	  upper: [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100],
  	  lower: [95,95,95,95,95,95,95,95,95,95,95,95,95,95,95,95,95,95,95,95,95,95,95,95,95]
    }
     this.handleClick = this.handleClick.bind(this)
     this.vitalsClick = this.vitalsClick.bind(this)
  }
  
    
// mount before component load
componentWillMount() {
      
// get inital state of patient information
this.getPatient("9995679")

// subscribe 
   pubnub.subscribe({
    channel : channel,
    message:  (message, envelope, channelOrGroup, time, channel) =>  {
            console.log(
                "Message Received." + "\n" +
                "Channel or Group : " + JSON.stringify(channelOrGroup) + "\n" +
                "Channel : " + JSON.stringify(channel) + "\n" +
                "Message : " + JSON.stringify(message) + "\n" +
                "Time : " + time + "\n" +
                "Raw Envelope : " + JSON.stringify(envelope)
                      )
 	this.success(message)
 	}
});
      
      }
      
// get the patient info from fhir api      
getPatient(idd){

var demo = {
    serviceUrl: "https://fhir-open-api-dstu2.smarthealthit.org",        //allows you to connect to your smar server and query a patient 
    patientId: idd // josuah p willams hca-pat-55 1137192
    };

// Create a FHIR client (server URL, patient id in `demo`)
var smart = FHIR.client(demo),
    pt = smart.patient;  
  
pt.read()
    .then( (p)=> {
     name = p.name[0];
     formatted = name.given.join(" ") + " " + name.family;
     mrnum = p.id
     dob = new XDate(p.birthDate);
     age = Math.floor(dob.diffYears(new XDate()));
     this.fetchProfile(formatted, mrnum, age);
     console.log(age)
}); 
}     
          
fetchProfile(formatted, mrnnum, age) { 
   this.setState({
     fullname: formatted,
     mrn: mrnum,
     age: age
    });          
          
 }
 
success(message) { 
     this.setState({
      spo: message.spo,
      dia: message.dia,
      sys: message.sys,
      dataGraph : this.state.dataGraph.concat([ message.spo ])
    });
  }
  
 vitalsClick(start){
     	if(start==="start") {
    var vitalsim = setInterval( _ =>{
      
 // create random patient vital data 
      spo = Math.floor(random());
      sys = Math.floor(randomSys());
      dia = Math.floor(randomDia());
      
// Publish new data to pubnub channel for data to be consumed by subscribers 
    pubnub.publish({
    channel : channel,
    message :{
       spo:spo,
       dia:  dia,
       sys: sys 
        
    }
  });
  
    }, 2000 )
     	    
    this.setState({
        vitalsim: vitalsim
    })
     	}
    else{
     clearInterval(this.state.vitalsim);
     console.log("wtf")
    }
     
  }
 
 handleClick(iddd){
    this.getPatient(iddd)
  }    
    
  render() {
    return <div>
    
   <div className="row page-title text-center"  >
       <h3>Choose a Patient:</h3>
        <button className="patientButton" onClick={()=>this.handleClick("9995679")}>
       <b className="patientText"> A.A</b>
       </button>
        <button className="patientButton" onClick={()=>this.handleClick("99912345")}>
       <b className="patientText"> A.V</b>
       </button> 
       <button className="patientButton" onClick={()=>this.vitalsClick("start")}>
       <b className="patientText"> Start</b>
       </button>
        <button className="patientButton" onClick={()=>this.vitalsClick("stop")}>
       <b className="patientText"> Stop</b>
       </button> 
       </div> 
    <PulseOx />
    <BloodPressure />
    <PatientInfo  mrn={this.state.mrn} age={this.state.age} fullname={this.state.fullname} spo={this.state.spo} lower={this.state.lower} upper={this.state.upper} dataGraph={this.state.dataGraph} />
    <PatientVitals  mrn={this.state.mrn} age={this.state.age} fullname={this.state.fullname} spo={this.state.spo} dia={this.state.dia} sys={this.state.sys}  dataGraph={this.state.dataGraph}  lower={this.state.lower} upper={this.state.upper} />
    <PatientVitalsSp  mrn={this.state.mrn} age={this.state.age} fullname={this.state.fullname} spo={this.state.spo} />
    <PatientVitalsBp  mrn={this.state.mrn} age={this.state.age} fullname={this.state.fullname}  dia={this.state.dia} sys={this.state.sys} />
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('app'))