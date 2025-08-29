const express = require("express");
const Ticket = require("../models/ticket");
const Event = require("../models/event");
const auth = require("../middleware/auth");
const router = express.Router();

// Buy ticket
router.post("/", auth, async (req, res) => {
  try {
    const { eventId } = req.body;
    const ticket = new Ticket({ event: eventId, user: req.user.id });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get my tickets
router.get("/my", auth, async (req, res) => {
  console.log(req.body);
  const tickets = await Ticket.find({ user: req.user.id }).populate("event");
  res.json(tickets);
});

module.exports = router;
