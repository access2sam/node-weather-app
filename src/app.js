const path = require("path")
const express = require("express")
const hbs = require("hbs")

const forecast = require("./utils/forecast")
const geocode = require("./utils/geocode")

console.log(path.join(__dirname, "../public"))
const app = express() // creating an express application
const port = process.env.PORT || 3000

//configuring path for the Express
const publicPath = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

//Setting up handlebar engine and views location
app.set("view engine", "hbs")
app.set("views", viewPath)
hbs.registerPartials(partialPath)

//Setting up static dir to serve
app.use(express.static(publicPath))

//Routes
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Sameer"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Sameer"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        message: "Help coming from handlebar template",
        title: "Help",
        name: "Sameer"
    })
})

app.get("/weather", (req, res) => {
    //console.log(req.query.address)
    if(!req.query.address) {
         res.send({
            error: "Please provide a location!"
        })
    } else {
        geocode(req.query.address, (error, geocodeData) => {
            if(error) {
                return res.send({error})
            }
            forecast(geocodeData.latitude, geocodeData.longitude, (error, forecastData) => {
                if(error) {
                  return res.send({error})
                }
                res.send({
                    location: geocodeData.location,
                    forecast: forecastData
                })
            })
        })
    }
  
})
//Setting up 404 error routes
app.get("/help/*", (req, res) => {
    res.render("404", {
        errorMessage: "Help article not found",
        name: "Sameer",
        title: "404 error - article not found"
    })    
})
app.get("*", (req, res) => {
    res.render("404", {
       errorMessage: "Page not found",
       name: "Sameer",
       title: "404 error"
    })
})


//starting the server
app.listen(port, () => {
    console.log("Server is listning on " + port)
})
