const express = require("express");
const Ticket = require("../models/ticket");
const auth = require("../middleware/auth");
const router = express.Router();

router.delete('/:id',auth, async (req,res)=>{
  try{
    const isDeleted = await Ticket.findByIdAndDelete(req.params.id);
    if(!isDeleted){
      return res.status(404).json({ message: 'ticket not found' });
    }
    res.status(200).json({ message: 'ticket deleted successfully', isDeleted });
  }
  catch(error){
    console.error('Error deleting ticket:', error);
    res.status(500).json({ message: 'Server error' });
  }

})
// Get my tickets
router.get("/my", auth, async (req, res) => {
  console.log(req.body);
  const tickets = await Ticket.find({ user: req.user.id }).populate("event");
  res.json(tickets);
});

module.exports = router;
