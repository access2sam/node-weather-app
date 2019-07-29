const request = require("request")

const forecast = (lat, long, callback) => {
    const url = "https://api.darksky.net/forecast/1957dfdff3eb9a014e86aad8d0d46f11/" + lat + "," + long
    request({uri: url, json: true}, (error, response) => {
        if(error) {
            callback("Unable to connect to weather API!", undefined)
        } else if(response.body.error) {
            callback("Location not found! Try again...", undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary +"It is currently "+ response.body.currently.temperature + " degress out. There is " + response.body.currently.precipProbability + "% chance of rain")
        }
    })
}

module.exports = forecast