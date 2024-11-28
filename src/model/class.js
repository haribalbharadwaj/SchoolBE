const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
  },
  teacher: {
    type: Number,
    required:true,
  },
  studentFees: {
    type: Number,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
  ],
  maxStudents: {
    type: Number,
    default: 30, // A limit for the number of students
  },
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);
