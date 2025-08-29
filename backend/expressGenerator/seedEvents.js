const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Event = require("./models/event");
const User = require("./models/user");

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding...");

    // find organizer
    const user = await User.findOne({ email: "mayandimayandi11@gmail.com" });
    if (!user) {
      console.log("Organizer not found!");
      process.exit(1);
    }

    // bulk dummy events
    const events = [
      {
        organizer: user._id,
        title: "Tech Conference 2025",
        description: "Explore the latest in AI, Cloud, and Web3.",
        date: new Date("2025-09-15"),
        time: "10:00 AM",
        location: "Chennai Trade Center",
        capacity: 200,
        price: "Free",
        aboutEvent: "Join top industry experts...",
        whatsIncluded: ["Workshops", "Lunch", "Networking"],
        schedule: [
          { time: "10:00 AM", activity: "Keynote" },
          { time: "12:00 PM", activity: "Panel Discussion" },
        ],
      },
      {
        organizer: user._id,
        title: "Startup Pitch Night",
        description: "Pitch your startup ideas to investors.",
        date: new Date("2025-10-05"),
        time: "6:00 PM",
        location: "Bangalore Startup Hub",
        capacity: 100,
        price: "$20",
        aboutEvent: "Get feedback and funding opportunities...",
        whatsIncluded: ["Snacks", "Investor Meet"],
        schedule: [{ time: "6:30 PM", activity: "Pitches Begin" }],
      },
      {
        organizer: user._id,
        title: "Music Fest 2025",
        description: "Live performances by popular bands.",
        date: new Date("2025-11-20"),
        time: "5:00 PM",
        location: "Marina Beach Grounds",
        capacity: 5000,
        price: "$10",
        aboutEvent: "Enjoy a night of music, food, and fun.",
        whatsIncluded: ["Concert", "Food Stalls"],
        schedule: [{ time: "7:00 PM", activity: "Main Performance" }],
      },
    ];

    // insert
    await Event.insertMany(events);
    console.log("Dummy events inserted successfully ✅");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding:", err);
    process.exit(1);
  }
}

seed();
