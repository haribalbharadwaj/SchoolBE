const { body, validationResult } = require('express-validator');

exports.validateTeacher = [
  body('teacherName').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
