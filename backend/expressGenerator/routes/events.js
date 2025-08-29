const express = require("express");
const Event = require("../models/event");
const router = express.Router();
const Ticket = require("../models/ticket");
const auth = require("../middleware/auth");

// Create new event
router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Get events created by the logged-in organizer
router.get("/my", auth, async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user.id });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all events
router.get("/", async (req, res) => {
  const events = await Event.find().populate("organizer", "username email");
  res.json(events);
});

// Get one event
router.get("/:id", async (req, res) => {
  const event = await Event.findById(req.params.id).populate("attendees", "username email");
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json(event);
});

// Create new event (only logged-in users, usually organizers)
router.post("/", auth, async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      organizer: req.user.id, // 👈 from token, more secure than trusting client
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Register/attend event (only logged-in users)

router.post("/:id/register", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.attendees.includes(req.user.id)) {
      return res.status(400).json({ message: "Already registered" });
    }

    // Add user to attendees
    event.attendees.push(req.user.id);
    await event.save();

    // Create a ticket for the event
    const ticket = new Ticket({
      event: event._id,
      user: req.user.id
    });
    await ticket.save();

    res.json({ message: "Registered successfully", ticket });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


module.exports = router;
