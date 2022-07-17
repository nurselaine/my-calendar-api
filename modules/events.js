'use strict';

const Events = require('./model');
const verifyUser = require('./auth');

const Calendar = {};

Calendar.getAllEvents = async (request, response, next) => {
  verifyUser(request, async (error) => {
    if(error){
      response.send('invalid tokem');
    } else {
      try {
        let eventData = await Events.find();
        // console.log(eventData);
        response.status(200).send(eventData);
      } catch (error) {
        next(error);
      }
    }
  })
}

Calendar.addAnEvent = async (request, response, next) => {
  try {
    const data = request.body; 
    let newEvent = await Events.create(request.body);
    response.status(200).send(newEvent);
    // const data = request.body;
    // const newEvent = new Events(data);
    // await newEvent.save();
    response.status(200).json(newEvent);
  } catch(error) {
    next(error);
  }
}

Calendar.updateAnEvent = async (request, response, next) => {
  try {
    const newData = request.body;
    const id = request.params.id;
    const updatedEvent = await Events.findByIdAndUpdate(id, newData, { new: true, overwrite: true });
    response.status(200).send(updatedEvent);
  } catch (error) {
    next(error);
  }
}

Calendar.deleteAnEvent = async (request, response, next) => {
  try {
    const id = request.params.id;
    await Events.findByIdAndDelete(id);
    response.status(200).send(id);
  } catch (error) {
    next(error);
  }
}

module.exports = Calendar;