'use strict';

const mongoose = require('mongoose');

const { schema } = mongoose;

const eventSchema = {
  title: {type: String, required: true},
  description: {type: String, required: false},
  time: {type: String, required: true},
  date: {type: Object, required: true},
  user: {type: String, required: false}, // will change to true with auth0
}

const EventModel = mongoose.model('Events', eventSchema)

module.exports = EventModel;