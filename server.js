'use strict'

const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 3002;

let getHolidays = require('./modules/holidays');
const Events = require('./modules/model');
const Calendar = require('./modules/events');

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', () => console.log('Mongoose is connected'));

// ****************** Routes ***********************

app.get('/holidays', getHolidays); // get API data

// MONGODB data 
app.get('/events/collection', Calendar.getAllEvents);
app.put('/events/:id', Calendar.updateAnEvent);
app.post('/events', Calendar.addAnEvent);
app.delete('/events/:id', Calendar.deleteAnEvent);


// ****************** Home / Route **********************

app.get('/', (request,response) => {
  response.send(`hello ${PORT}`);
})

// ****************** * Route **********************

app.get('*', (request, response) => {
  response.send('nothing is here.. move on');
})

// ****************** Listener **************************

app.listen(PORT, () => console.log(PORT));