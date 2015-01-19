// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
"use strict";

// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-upload';

// Port where we'll run the websocket server
var webSocketsServerPort = 1337;

// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');

/**
 * Global variables
 */
var files = [ ];
var i = 0;
var connection;

var fs = require('fs');


/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
    // Not important for us. We're writing WebSocket server, not HTTP server
});
server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket request is just
    // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server
});

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

    // accept connection - you should check 'request.origin' to make sure that
    // client is connecting from your website
    // (http://en.wikipedia.org/wiki/Same_origin_policy)
    connection = request.accept(null, request.origin);
    var conid = i;
    i = i+1;
    console.log((new Date()) + ' Connection '+ i +' accepted.');
    var wstream;
    var username;
    var number=0;
    // user sent some message
    
    connection.on('message', function(message) {
        console.log('Cos przyszlo!');
        //rozpoznanie wiadomosci - czy to chunk, czy dzien dobry, jestem plikiem (ktorym?)
        console.log(message);
        if(message.type === 'utf8' && number==0)
        {
        	var msg = JSON.parse(message.utf8Data);
        	if(msg.type=='info'){
        		console.log('Przyszlo info');
        		number = number+1
        		username = msg.user;
        		wstream = fs.createWriteStream('user1/'+msg.filename);
        	}
        }
        else{	
        	console.log('Przyszedl chunk');
        	wstream.write(message.utf8Data);
        	//wstream.end();
        	number = number + 1;
        	connection.sendUTF(JSON.stringify({ type:'chunkok', numer: 1 }));
        }
    });

    // user disconnected
    connection.on('close', function(connection) {
   	wstream.end();
    });

});
