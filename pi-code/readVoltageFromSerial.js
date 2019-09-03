const axios = require("axios"); //to post to fb
const remoteURL = "https://front-end-capstone-6c028.firebaseio.com" //fb endpoint
// const timeout = process.argv[2] 

//function definitions
const voltageToCel = (voltage) => {
    const celcius = ((voltage * 1000) - 500) / 10
    return celcius
}
const voltagetoFar = (voltage) => {
    const celcius = ((voltage * 1000) - 500) / 10
    const farenheit = ((celcius * 9) / 5) + 32
    return farenheit
}
const postData = (tempObj) => {
    axios.post(`${remoteURL}/appData.json`, {
        temp: tempObj
    })
}
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
//main logic
//TO WORK ON WINDOWS - change 'dev/ttyAMA0' to 'COM3'
//AND --- replace 'baudrate: 9600' w/ 'console.log('port opened')
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