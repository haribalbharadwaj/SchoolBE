const express = require('express');
const { createStudent, getStudents, getStudentById, updateStudent, deleteStudent } = require('../controller/student');
const { validateStudent } = require('../validator/student');

const router = express.Router();

router.post('/create', validateStudent, createStudent); // Create student
router.get('/', getStudents); // Get all students
router.get('/:id', getStudentById); // Get student by ID
router.put('/:id', validateStudent, updateStudent); // Update student by ID
router.delete('/:id', deleteStudent); // Delete student by ID

module.exports = router;
