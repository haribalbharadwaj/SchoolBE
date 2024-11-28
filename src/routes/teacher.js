const express = require('express');
const { createTeacher, getTeachers, getTeacherById, updateTeacher, deleteTeacher } = require('../controller/teacher');
const { validateTeacher } = require('../validator/teacher');

const router = express.Router();

router.post('/create', validateTeacher, createTeacher); // Create teacher
router.get('/', getTeachers); // Get all teachers
router.get('/:id', getTeacherById); // Get teacher by ID
router.put('/:id', validateTeacher, updateTeacher); // Update teacher by ID
router.delete('/:id', deleteTeacher); // Delete teacher by ID

module.exports = router;
