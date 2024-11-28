const express = require('express');
const { createClass, getClasses, getClassById, updateClass, deleteClass } = require('../controller/class');
const { validateClass } = require('../validator/class');

const router = express.Router();

router.post('/create', validateClass, createClass); // Create class
router.get('/', getClasses); // Get all classes
router.get('/:id', getClassById); // Get class by ID
router.put('/:id', validateClass, updateClass); // Update class by ID
router.delete('/:id', deleteClass); // Delete class by ID

module.exports = router;
