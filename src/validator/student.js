const { body, validationResult } = require('express-validator');

exports.validateStudent = [
  body('studentName').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('dob').notEmpty().withMessage('Date of birth is required'),
 // body('className').notEmpty().withMessage('Class ID is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
