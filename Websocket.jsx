/*The MIT License (MIT)

Copyright (c) 2015 Pim Voeten

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

'use strict';

var React = require('react');
var WebSocket = require('ws');

module.exports = React.createClass({

    propTypes: {
        url: React.PropTypes.string.isRequired,
        onMessage: React.PropTypes.func.isRequired,
        debug: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            debug: false
        }
    },

    getInitialState: function () {
        return {
            ws: new WebSocket(this.props.url)
        }
    },

    log: function (logline) {
        if (this.props.debug === true) {
            console.log(logline);
        }
    },

    componentWillMount: function () {
        this.log('Websocket componentWillMount');
        var self = this;
        var ws = self.state.ws;
        ws.addEventListener('open', function open() {
            self.log('Websocket connected');
            ws.send("something")
        });
        ws.addEventListener('message', function incoming(event) {
            var data = JSON.parse(event.data);
            self.log('Websocket incoming data');
            self.log(event.data);
            self.props.onMessage(data);
            ws.send("something")
        });
        ws.addEventListener('close', function close() {
            self.log('Websocket disconnected');
        });
    },

    componentWillUnmount: function () {
        this.log('Websocket componentWillUnmount');
        this.state.ws.close();
    },

    render: function () {
        return React.createElement("div", React.__spread({}, this.props))
    }
});
