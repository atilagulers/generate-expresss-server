const {UnauthenticatedError, BadRequestError} = require('../errors');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new UnauthenticatedError('Authentication invalid.');

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach the user to the job routes
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) throw new BadRequestError('User not found.');

    req.user = user;
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid.');
  }
};

module.exports = auth;
