let bookings = require("../models/bookingsData");

const bookTrip = (req, res) => {
  const { userId, tripId, bookingDate } = req.body;
  const newBooking = { id: bookings.length + 1, userId, tripId, bookingDate, status: "pending" };
  bookings.push(newBooking);
  res.status(201).json(newBooking);
};

const getUserBookings = (req, res) => {
  res.json(bookings);
};

module.exports = { bookTrip, getUserBookings };
