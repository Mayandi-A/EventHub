const express = require("express");
const Event = require("../models/event");
const router = express.Router();
const Ticket = require("../models/ticket");
const auth = require("../middleware/auth");

const User = require("../models/user"); 
// Create new event (only logged-in users, usually organizers)
router.post("/", auth, async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      organizer: req.user.id, // secure assignment
    });
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

// ✅ Get attendees for an event
router.get('/:id/attendees', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('attendees', 'username email phone'); // populate only needed fields

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event.attendees || []);
  } catch (err) {
    console.error('Error fetching attendees:', err);
    res.status(500).json({ message: 'Error fetching attendees' });
  }
});

router.delete('/:id',auth, async (req,res)=>{
  try{
    const isDeleted = await Event.findByIdAndDelete(req.params.id);
    if(!isDeleted){
      return res.status(404).json({ message: 'event not found' });
    }
    res.status(200).json({ message: 'event deleted successfully', isDeleted });
  }
  catch(error){
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Server error' });
  }

})

//✅ update an event
router.put("/:id",auth, async(req,res)=>{
  try{
    const event = await Event.findByIdAndUpdate(req.params.id,req.body ,{new : true})
    if(!event){
      return res.status(404).send('event not found');
    }
    res.status(200).json({ message: 'event edited successfully', event });
  }catch(error){
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Server error' });
  }
})

// ✅ Register user for an event
router.post("/:id/register", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Prevent duplicate registrations
    if (event.attendees.includes(req.user.id)) {
      return res.status(400).json({ message: "Already registered" });
    }

    // Add user ID to event attendees
    event.attendees.push(req.user.id);
    await event.save();

    // Create a ticket and include user info for easy frontend display
    const user = await User.findById(req.user.id);
    const ticket = new Ticket({
      event: event._id,
      user: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone
    });
    await ticket.save();

    res.json({ message: "Registered successfully", ticket });
  } catch (err) {
    console.error('Error registering:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
