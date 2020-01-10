const net = require('net');
const device = require('./simulate device/device.js')

const options = {
    port: 9000
}

const deviceConfiguration = {
    imei: '123456789123456',
    type: 0001,
}

var serialNo = 0000;

const client = net.createConnection(options, () => {
    serialNo++;
    let packet = device.generateLoginPacketString(deviceConfiguration, serialNo);
    console.log(packet);
    client.write(packet)

});

client.on('data', data => {
    data = data.toString()
    console.log('data recieved', data.toString());

    let protocolNo = data.slice(6, 8);
    if (protocolNo == '01') {
        console.log('login Successful')
    }
    // client.end();
})