/** @jsx React.DOM */
'use strict'
var React = require('react');
var Websocket = require('./Websocket');
var BarChart = require('react-d3/barchart').BarChart;

var Spectrum = React.createClass({
	handleData: function(data) {
       // do something with the data 
       this.setState({freqs:data});
    },
    getInitialState:function() {
    	var data = [{
		    label: 'somethingA',
		    values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
		}];
    	return {
    		freqs:data
    	};
    },
	render: function() {
		var data = this.state.freqs;
		var height = 10;
		var w = parseInt(window.innerWidth,10)
		var h = parseInt(window.innerHeight*0.9,10)
      /**/
      return <div>
      <Websocket url='ws://localhost:8080/fft' onMessage={this.handleData}/>
      <BarChart data={data} width={w} height={h/2} fillColor={"#00A000"} xAxis={{innerTickSize: 0, label: "x-label"}}
                    yAxis={{innerTickSize: 0}}/>
      </div>
    }
})

module.exports = Spectrum;