//console.log("Client side JS file!")

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-one")
const messageTwo = document.querySelector("#message-two")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = "Fetching...."
    messageTwo.textContent = ""

    fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            //console.log(data.error)
            messageOne.textContent = data.error
        } else {
            // console.log(data.location)
            // console.log(data.forecast)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})