const currentweather  = require("./currentweather")
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

exports.decoded = async(req, res) => {
    try {
        const {city, country, statecode, countrycode} = req.body
        if(!city || !country) {
            res.status(500).json({
                message: "city and country is needed" 
            })
        } 
           else {
            const location = {
                city,
                country,
                statecode, 
                countrycode
            }

            const baseurl = "https://api.openweathermap.org/geo/1.0/direct"

            const geocode = await fetch(`${baseurl}q=${location.city},${location.country},${location.countrycode}&limit={limit}&appid=${APIkey}`)

            res.status(201).json({
                message: "succesful",
               // message: weatherinfo
            })
            console.log('succesfull')  
        }
    } catch (error) {
        
    }
}
