const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['upcoming', 'completed'], default: 'upcoming' },
  participants: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  donationTarget: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
