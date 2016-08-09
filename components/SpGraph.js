import React from 'react';

const styleGreen= {
      stroke: "rgb(0, 255, 0)"
    }
    
const Sparkline = props => {
let points =props.dataGraph.map( (y, x) => ( `${x * 20},${y*6}` ) ).join(' ');
let upper = props.upper.map( (y, x) => ( `${x * 20},${y*6}` ) ).join(' ');
let lower = props.lower.map( (y, x) => ( `${x * 20},${y*6}` ) ).join(' ');

    return <svg viewBox="0 0 500 100" width="500" height="100">
     <g transform="translate(0,625) scale(1,-1)">
    <polyline points={ points } stroke="#23fbbd" fill="none" strokeWidth="5" strokeLinecap="round" />
     <polyline points={ upper }  style={styleGreen}  fill="none" strokeWidth="2" strokeLinecap="round" strokeDasharray="9" />
      <polyline points={ lower } stroke="red" fill="none" strokeWidth="2" strokeLinecap="round" strokeDasharray="9" />
    </g>
    </svg>
};

export class Graph extends React.Component {

  render () {

    return <Sparkline dataGraph={ this.props.dataGraph.slice(-25) } upper={this.props.upper} lower={this.props.lower}/>;
  }
};