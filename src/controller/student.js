const Student = require('../model/student');
const Class = require('../model/class');

exports.createStudent = async (req, res) => {
  try {
    const { studentName, class: studentClassId, dob, email, phone, gender, feesPaid, contactDetails } = req.body;

    // Validate that contactDetails.email and contactDetails.phone are provided
    if (!contactDetails || !contactDetails.email || !contactDetails.phone) {
      return res.status(400).json({
        error: 'Both email and phone in contactDetails are required'
      });
    }

    const classDoc = await Class.findById(studentClassId);
    if (!classDoc) {
      return res.status(404).json({ error: 'Class not found' });
    }

    const studentData = {
      studentName,
      class: classDoc._id,       // Store ObjectId of the clas
      className: classDoc.className, 
      dob,
      email,
      phone,
      gender,
      feesPaid,
      contactDetails: contactDetails || {} // Use empty object if missing
    };

    console.log('Student data:',studentData);

    // Create new student from request body
    const student = new Student(studentData);

    // Check for existing student with the same email
    const existingStudent = await Student.findOne({ "contactDetails.email": contactDetails.email });
    if (existingStudent) {
      return res.status(400).json({ error: "Email already exists" });
    }

    await student.save(); // Save the student in the database

    // Check if the class exists and add the student
    console.log('Request body:', req.body);
    /*const classDoc = await Class.findOne({ className: studentClass });
    console.log('Class document:', classDoc);*/
    

    await Class.findByIdAndUpdate(
      classDoc._id,
      { $push: { students: student._id } }, // Add student to the class
      { new: true }
    );


    res.status(201).json({ message: 'Student created successfully', student });
  } catch (err) {
    console.error('Error creating student:', err);
    res.status(500).json({ error: err.message });
  }
};



// Get all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('class','className');
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('class');
    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update student by ID
/*exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.status(200).json({ message: 'Student updated successfully', student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};*/

exports.updateStudent = async (req, res) => {
  try {
    const { class: updatedClassId } = req.body; // Extract class ID if it's provided in the update request

    let updatedData = req.body; // Default updated data to what's in the request bod

    // If the class field is being updated, fetch the new class details
    if (updatedClassId) {
      const classDoc = await Class.findById(updatedClassId);
      if (!classDoc) {
        return res.status(404).json({ message: 'Class not found' });
      }
      updatedData.className = classDoc.className; // Update className based on the new class
      updatedData.class = classDoc._id; // Ensure the class reference is updated as well
    }

    // Now update the student document with the new data
    const student = await Student.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.status(200).json({ message: 'Student updated successfully', student });
  } catch (err) {
    console.error('Error updating student:', err);
    res.status(500).json({ error: err.message });
  }
};


const mongoose = require('mongoose');

exports.deleteStudent = async (req, res) => {
  const studentId = req.params.id;
  console.log("Received student ID:", studentId);

  // Validate ObjectId format for the studentId
  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(400).json({ message: 'Invalid student ID format' });
  }

  try {
    // Attempt to delete the student by ID using findOneAndDelete
    const student = await Student.findOneAndDelete({ _id: studentId });

    if (!student) {
      console.log('Student not found');
      return res.status(404).json({ message: 'Student not found' });
    }

    // Return success response
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error("Error during deletion:", err);
    res.status(500).json({ error: err.message });
  }
};