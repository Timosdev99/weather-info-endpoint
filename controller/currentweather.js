const express = require('express');
const axios = require('axios');  
const PORT = 3000
const app = express()
require('dotenv').config()

exports.getlocation = async (req, res) => {
    try {
        const { city, country, statecode, countrycode } = req.body
        if (!city || !country) {
            return res.status(400).json({
                message: "city and country is needed"
            })
        }

        const APIKEY = process.env.CURRENTWEATHERAPI;
        if (!APIKEY) {
            throw new Error('API key not configured');
        }

        const geourl = "https://api.openweathermap.org/geo/1.0/direct";
        
        
        const geocodeResponse = await axios.get(geourl, {
            params: {
                q: `${city},${country}${countrycode ? ',' + countrycode : ''}`,
                limit: 5,
                appid: APIKEY   
            }
        });

        const geodata = geocodeResponse.data;

        if (!geodata || geodata.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Location not found. Please check city and country names."
            });
        }
     
        const lat = geodata[0].lat;
        const lon = geodata[0].lon;

        
        const baseurl = "https://api.openweathermap.org/data/3.0/onecall";
        const weatherResponse = await axios.get(baseurl, {
            params: {
                lat: lat,
                lon: lon,
                appid: APIKEY
            }
        });

        return res.status(200).json({
            success: true,
            data: weatherResponse.data
        });

    } catch (error) {
        console.error('Error details:', error.response?.data || error.message);
        return res.status(500).json({
            success: false,
            message: `An error occurred: ${error.response?.data?.message || error.message}`
        });
    }
}