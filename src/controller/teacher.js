const Teacher = require('../model/teacher');

exports.createTeacher = async (req, res) => {
  try {
    console.log("Received teacher data:", req.body);  // Log the incoming data
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).json({ message: 'Teacher created successfully', teacher });
  } catch (err) {
    console.error('Error saving teacher:', err.message);  // Log the error
    res.status(500).json({ error: err.message });
  }
};


// Get all teachers
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('assignedClass');
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get teacher by ID
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('assignedClass');
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    res.status(200).json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update teacher by ID
exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    res.status(200).json({ message: 'Teacher updated successfully', teacher });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete teacher by ID
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
