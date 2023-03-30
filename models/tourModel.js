const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'], //This field is required .These object are Schema type options
    unique: true
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a maxGroupSize']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5 //If we forget to define then the default value will be 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  priceDiscount: {
    type: Number
  },
  summary: {
    type: String,
    required: [true, 'A tour must have a summary'],
    trim: true //Remove whitespaces in the beginning and in the Ending of the String
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover Image']
  },
  images: [String], //Array of Strings
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date] //Array of Dates
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
