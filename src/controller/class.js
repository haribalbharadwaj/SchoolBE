const Class = require('../model/class');

// Create a new class
exports.createClass = async (req, res) => {
  try {
    const newClass = new Class(req.body);
    await newClass.save();
    res.status(201).json({ message: 'Class created successfully', class: newClass });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all classes
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('teacher students');
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get class by ID
exports.getClassById = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id).populate('teacher students');
    if (!classData) return res.status(404).json({ message: 'Class not found' });

    res.status(200).json(classData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update class by ID
exports.updateClass = async (req, res) => {
  try {
    const classData = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!classData) return res.status(404).json({ message: 'Class not found' });

    res.status(200).json({ message: 'Class updated successfully', class: classData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete class by ID
exports.deleteClass = async (req, res) => {
  try {
    const classData = await Class.findByIdAndDelete(req.params.id);
    if (!classData) return res.status(404).json({ message: 'Class not found' });

    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
