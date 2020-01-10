const packetStartStrng = '7878'
const packetEndStrng = '0D0A'

function generateLoginPacketString(device, infoSerialNo) {
    let packet;
    let packetLength = 17;
    let protocolNo = 1;
    let timezoneLanguage = '2203';
    let crc = '5336'

    packet = packetStartStrng + getHexNumber(packetLength, 2) + getHexNumber(protocolNo, 2) + '0' + device.imei + getHexNumber(device.type, 4) +
        timezoneLanguage + getHexNumber(infoSerialNo, 4) + crc + packetEndStrng

    return packet;
}

function getHexNumber(num, digits) {
    let hex = num.toString(16)
    let hexlen = hex.length;
    if (hexlen < digits) {
        for (let i = 0; i < digits - hexlen; i++) {
            hex = '0' + hex;
        }
    }
    return hex;
}

module.exports.generateLoginPacketString = generateLoginPacketString;