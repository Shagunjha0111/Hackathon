const express = require("express");
const { bookTrip, getUserBookings } = require("../controllers/bookingController");

const router = express.Router();
router.post("/", bookTrip);
router.get("/", getUserBookings);

module.exports = router;
