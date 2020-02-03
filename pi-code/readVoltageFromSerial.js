const axios = require("axios");
const remoteURL = "https://front-end-capstone-6c028.firebaseio.com"


// Helper functions that convert sensor readings (volts) to degrees celcius and degrees farenheit
const voltageToCel = (voltage) => {
    const celcius = ((voltage * 1000) - 500) / 10
    return celcius
}

const voltagetoFar = (voltage) => {
    const celcius = ((voltage * 1000) - 500) / 10
    const farenheit = ((celcius * 9) / 5) + 32
    return farenheit
}


// POST to firebase db
const postData = (tempObj) => {
    axios.post(`${remoteURL}/appData.json`, {
        temp: tempObj
    })
}


// Read serial temperature data sent from arduino via USB
const ReadSerialData = (data) => {
    console.log(data);
    const temp = {
        voltage: parseFloat(data),
        degreesFar: voltagetoFar(data),
        degreesCel: voltageToCel(data),
        timestamp: Date.now()
    }
    postData(temp)
}
const SerialPort = require('serialport');
const port = new SerialPort('COM3', () => {
    console.log('port opened');
});
const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
    delimiter: '\r\n'
});
port.pipe(parser);
parser.on('data', ReadSerialData);