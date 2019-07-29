const request = require("request")

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYWNjZXNzc2FtIiwiYSI6ImNqeHNlNnl4YTA5dHkzbXBqZGE5NmJ1ZjMifQ.CBL1teHhgxBY21MajIDTiw"

    request({uri: url, json: true}, (error, response) => {
        if(error) {
            callback("Unable to connect to Geolocation API!",undefined)
        } else if(response.body.features.length === 0) {
            callback("Location not found! Try again...", undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode