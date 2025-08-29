const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  image: String,
  price: String,
  aboutEvent: String,
  whatsIncluded: [String],
  schedule: [{ time: String, activity: String }],
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Event", eventSchema);
