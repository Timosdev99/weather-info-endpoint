const currentwether = require('../controller/currentweather')

const express = require('express')
const route = express.Router()



route.get('/', (req, res) => {
    res.status(200).json({
        message: "working"
    })
})


route.post('/location', currentwether.getlocation)


module.exports = route  