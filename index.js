const express = require('express');
const cors = require('cors')
const PORT  = 3000
const app = express()
const bodyparser = require('body-parser')
const currentweather = require('./route/currentW') 
require('dotenv').config()
require('./db')





app.use(bodyparser.json())
app.get('/', (req, res) => {
    res.send('API is working ')
})

app.use('/weather', currentweather)





app.listen(PORT, () => {
    console.log('sever is running on port', PORT)
})   