const express = require('express');
const PORT = 3000
const app = express()
require('dotenv').config()

exports.getlocation = async (req, res) => {
    try {
        const { city, country, statecode, countrycode } = req.body
        if (!city || !country) {
            res.status(400).json({  
                message: "city and country is needed"
            })
        }
        else {
            const location = {
                city,
                country,
                statecode,
                countrycode,
            }
            const limit = 5

            const APIKEY = process.env.CURRENTWEATHERAPI;
            if (!APIKEY) {
                throw new Error('API key not configured');
            }
          
            console.log('Request body:', req.body);


            const geourl = "https://api.openweathermap.org/geo/1.0/direct"

            const geocode = await fetch(`${geourl}?q=${location.city},${location.country},${location.countrycode}&limit=${limit}&appid=${APIKEY}`)  
            const geodata = await geocode.json()

            if (!geodata.length) {
                return res.status(404).json({
                    success: false,
                    message: "Location not found"
                });
            }

            const lat = geodata[0].lat;  
            const lon = geodata[0].lon;  
            const part = location.statecode && location.countrycode;

            const baseurl = "https://api.openweathermap.org/data/3.0/onecall"

            const weatherResponse = await fetch(`${baseurl}?lat=${lat}&lon=${lon}&exclude=${part}&appid=${APIKEY}`) 
            const weatherinfo = await weatherResponse.json()  

            res.status(200).json({  
                success: true,
                data: weatherinfo
            })
            console.log('successful')
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `an error occurred: ${error.message}`
        })
        console.error(error)
    }
}