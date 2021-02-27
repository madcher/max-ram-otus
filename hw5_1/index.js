const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
app.use("/", express.static(__dirname + '/client'));
// websocket
const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server });

const sendMessages = async  (ws, count = 1) => {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("ready"), 3000)
    });
    
    await promise;
    ws.send(`hello from server ${count} time`);
    sendMessages(ws, count + 1);
};

webSocketServer.on('connection', ws => {
    console.log('ws connection ready');
    sendMessages(ws);
    ws.on('message', m => {
        console.log(m);
        webSocketServer.clients.forEach(client => client.send('we got it' + m));
    });
    ws.on("error", e => ws.send(e));
    ws.send('Hi there, I am a WebSocket server');
});

app.listen(3000, () => console.log('Express server listening on 3000'));
server.listen(8888);
///////////////////
