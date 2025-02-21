let trips = require("../models/tripsData");

const getTrips = (req, res) => {
  res.json(trips);
};

const addTrip = (req, res) => {
  const { title, description, price, availableDates } = req.body;
  const newTrip = { id: trips.length + 1, title, description, price, availableDates };
  trips.push(newTrip);
  res.status(201).json(newTrip);
};

const getTrip = (req, res) => {
  const trip = trips.find(t => t.id == req.params.id);
  trip ? res.json(trip) : res.status(404).json({ message: "Trip not found" });
};

const removeTrip = (req, res) => {
  trips = trips.filter(t => t.id != req.params.id);
  res.json({ message: "Trip deleted" });
};

module.exports = { getTrips, addTrip, getTrip, removeTrip };
