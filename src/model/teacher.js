const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  teacherName: {
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
  contactDetails: {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  salary: {
    type: Number,
    required: true,
  },
  assignedClass: {
    type: String,
    required: true,
    // Temporarily remove regex validation
  },
 
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
