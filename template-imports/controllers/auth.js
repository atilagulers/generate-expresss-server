const commonJS = `
const {StatusCodes} = require('http-status-codes');
const User = require('../models/User');
const {BadRequestError, UnauthenticatedError} = require('../errors');
`;

const module = `
import StatusCodes from 'http-status-codes';
import User from '../models/User.js';
import {BadRequestError, UnauthenticatedError} from './errors.js';
`;
