const express = require('express');
const geocode = require('../controller/geocoding')
const PORT  = 3000
const app = express()
require('dotenv').config





 exports.getlocation =(async(req, res) => {
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
                countrycode, 
                
            }
            const limit = 5

            let APIKEY= process.env.CURRENTWEATHERAPI;

            const geourl = "https://api.openweathermap.org/geo/1.0/direct"

            const geocode = await fetch(`${geourl}q=${location.city},${location.country},${location.countrycode}&limit=${limit}&appid=${APIKEY}`)
                const lat =  geocode.lat;
                  const lon = geocode.lon;
                  const part = location.statecode && location.countrycode;
           
             
            const baseurl = "https://api.openweathermap.org/data/3.0/onecall"
         
            const weatherinfo = fetch(`${baseurl}?lat=${lat}&lon=${lon}&exclude=${part}&appid=${APIKEY}`)
            res.status(201).json({
                message: "succesful",
                message: weatherinfo,
               mesage: geocode
            })
            console.log('succesfull')  
           }
       

    } catch (error) {
        res.status(500).json({
            message: `an error occur: ${error.message}`
           
        })
        console.error(error)
    }
}) 