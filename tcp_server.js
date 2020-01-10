const net = require('net');
const port = 9000;

const server = net.createServer(conn => {
    console.log('New Client Connected');

    conn.on('data', data => {
        data = data.toString();
        let protocolNo = data.slice(6, 8);

        console.log('data recieved', data)
        let response = sendResponse(protocolNo, data)
        console.log('sending response', response)

        conn.write(response)
    })

    conn.on('end', () => {
        console.log('Client Disconnected');
    })
})

function sendResponse(protocolNumber, packet) {
    switch (protocolNumber) {
        case '01':
            return sendLoginResponse(packet)
        default:
            return ('Invalid protocol Number');
    }
}

function sendLoginResponse(packet) {
    let response;
    response = packet.slice(0, 8) + packet.slice(-12)
    return response;
}

server.listen(port, () => {
    console.log('listening on port', port)
});