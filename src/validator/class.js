const { body, validationResult } = require('express-validator');

exports.validateClass = [
  body('className').notEmpty().withMessage('Class name is required'),
  body('teacher').notEmpty().withMessage('Teacher ID is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
