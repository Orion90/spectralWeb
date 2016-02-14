/** @jsx React.DOM */
'use strict'
var React = require('react');
var StyleSheet = require('react-style');

var BarComponent = React.createClass({
	
	getInitialState: function(){
		return {height:this.props.data};
	},
	getStyle: function() {
		var h = this.state.height+"px";
		return StyleSheet.Create({
			height:h,
			width:"10px",
			backgroundColor:"red"
		});
	},
	render: function() {
		var s = this.getStyle();
		return (
			<div style={s}></div>
			)
	}

});

