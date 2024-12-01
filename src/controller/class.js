const Class = require('../model/class');
const teacher = require('../model/teacher');
const Teacher = require('../model/teacher');

/*const teacherId = mongoose.Types.ObjectId.isValid(req.body.teacher) ? mongoose.Types.ObjectId(req.body.teacher) : null;

if (!teacherId) {
  return res.status(400).json({ error: 'Invalid teacher ID' });
}
*/
// Create a new class
/*
exports.createClass = async (req, res) => {
  try {

    const teacherId = mongoose.Types.ObjectId.isValid(req.body.teacher) ? mongoose.Types.ObjectId(req.body.teacher) : null;
    if (!teacherId) {
      return res.status(400).json({ error: 'Invalid teacher ID' });
    }
    const newClass = new Class(req.body);
    await newClass.save();
    res.status(201).json({ message: 'Class created successfully', class: newClass });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};*/

exports.createClass = async (req, res) => {
  try {
    const { className, year, teacher:teacherId, teacherName, studentFees, maxStudents } = req.body;

    // Validate teacher ID
    const validTeacher = await Teacher.findById(teacherId);
    if (!validTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

   

    // Create the new class with teacher's ObjectI
    const newClass = new Class({
      className,
      year,
      teacher:validTeacher._id, // ObjectId reference to the teacher
      teacherName:validTeacher.teacherName,
      studentFees,
      maxStudents,
    });

    // Save the class to the database
    await newClass.save();

    // Return the created class data
    res.status(201).json({
      message: 'Class created successfully',
      class: newClass,
    });
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
    const { teacher: updatedTeacherId } = req.body; 

    let updatedData = req.body;


    if (updatedTeacherId) {
      const teacherDoc = await Teacher.findById(updatedTeacherId);
      if (!teacherDoc) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
      updatedData.teacherName = teacherDoc.teacherName; // Update className based on the new class
      updatedData.teacher = teacherDoc._id; // Ensure the class reference is updated as well
    }

    const classData = await Class.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!classData) return res.status(404).json({ message: 'Student not found' });

    res.status(200).json({ message: 'Class updated successfully', classData });

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
