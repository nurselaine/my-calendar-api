'use strict';

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());

const getHolidays = async (request, response, next) => {
  try {
    let country = request.query.country;
    let year = request.query.year;
    
    let url = `https://holidayapi.com/v1/holidays?country=${country}&year=${year}&key=${process.env.HOLIDAY_API_KEY}`;
    let data = await axios.get(url);
    let sanitizedData = parseHolidayData(data.data);
    // console.log(sanitizedData);
    response.status(200).send(sanitizedData);
  } catch (error) {
    next(error)
  }
}

const parseHolidayData = data => {
  let filteredData = data.holidays.filter(day => day.public === true);
  filteredData = filteredData.map(day => {
    let dateArr = day.date.split('-');
    day.date = {
      year: parseInt(dateArr[0]),
      month: parseInt(dateArr[1]),
      day: parseInt(dateArr[2]),
    }
    return day;
  })
  return filteredData;
  // console.log(filteredData);
}

module.exports = getHolidays;