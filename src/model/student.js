const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  feesPaid: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    required: true, 
  },
  contactDetails: {
    phone: { type: String, required: true, unique: true  }, // Make this optional
    email: { type: String, required: true } // Make this optional
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
