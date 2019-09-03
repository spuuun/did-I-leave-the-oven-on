const axios = require("axios");
const remoteURL = "https://front-end-capstone-6c028.firebaseio.com"
const timeout = process.argv[2]

//helper functions to convert incoming serial sensor data from voltage to degrees celcius and farenheit, respectively
const voltageToCel = (voltage) => {
    const celcius = ((voltage * 1000) - 500) / 10
    return celcius
}
const voltagetoFar = (voltage) => {
    const celcius = ((voltage * 1000) - 500) / 10
    const farenheit = ((celcius * 9) / 5) + 32
    return farenheit
}

//dummy data until breakout board for raspberry pi arrives
const temps = [
    {
        voltage: 0.73,
        degreesCel: voltageToCel(0.73),
        timestamp: Date.now(),
        degreesFar: voltagetoFar(0.73),
    },
    {
        voltage: 0.77,
        degreesCel: voltageToCel(0.77),
        timestamp: Date.now(),
        degreesFar: voltagetoFar(0.77),
    },
    {
        voltage: 0.76,
        degreesCel: voltageToCel(0.76),
        timestamp: Date.now(),
        degreesFar: voltagetoFar(0.76),
    },
    {
        voltage: 0.69,
        degreesCel: voltageToCel(0.69),
        timestamp: Date.now(),
        degreesFar: voltagetoFar(0.69),
    },
    {
        voltage: 0.81,
        degreesCel: voltageToCel(0.81),
        timestamp: Date.now(),
        degreesFar: voltagetoFar(0.81),
    },
    {
        voltage: 0.89,
        degreesCel: voltageToCel(0.89),
        timestamp: Date.now(),
        degreesFar: voltagetoFar(0.89),
    },
    {
        voltage: 0.65,
        degreesCel: voltageToCel(0.65),
        timestamp: Date.now(),
        degreesFar: voltagetoFar(0.65),
    },
    {
        voltage: 0.83,
        degreesCel: voltageToCel(0.83),
        timestamp: Date.now(),
        degreesFar: voltagetoFar(0.83)
    },
    {
        voltage: 0.77,
        degreesCel: voltageToCel(0.77),
        timestamp: Date.now(),
        degreesFar: voltagetoFar(0.77)
    },
    {
        voltage: 0.85,
        degreesCel: voltageToCel(0.85),
        timestamp: Date.now(),
        degreesFar: voltagetoFar(0.85)
    },
    {
        voltage: 0.80,
        degreesCel: voltageToCel(0.80),
        timestamp: Date.now(),
        degreesFar: voltagetoFar(0.80)
    },
    {
        voltage: 0.55,
        degreesCel: voltageToCel(0.55),
        timestamp: Date.now(),
        degreesFar: voltagetoFar(0.55)
    },
    {
        voltage: 0.63,
        degreesCel: voltageToCel(0.63),
        timestamp: Date.now(),
        degreesFar: voltagetoFar(0.63)
    },
    {
        voltage: 0.68,
        degreesCel: voltageToCel(0.68),
        timestamp: Date.now(),
        degreesFar: voltagetoFar(0.68)
    }
]

//get random item from array of dummy data
const getRandomTemp = () => {
    const randomIndex = Math.floor(Math.random() * temps.length)
    const randomTemp = temps[randomIndex]
    return randomTemp
}

//posts random item from array of dummy data to firebase real-time db 
//at an interval specified when running this script
//or every 10 seconds if no interval is specified
setInterval(() => {
    const temp = getRandomTemp();
    axios.post(`${remoteURL}/appData.json`, {
        temp: temp
    })
}, timeout || 10000)