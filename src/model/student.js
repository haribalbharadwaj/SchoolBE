const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',  // ObjectId reference to the Class mod
    required: true
  },
  className: {
    type: String,  // Store class name here
    required: true
  },
  contactDetails: {
    phone: { type: String, required: true, unique: true  }, // Make this optional
    email: { type: String, required: true } // Make this optional
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
