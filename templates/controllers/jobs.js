const {StatusCodes} = require('http-status-codes');
const Job = require('../models/Job');
const {NotFoundError} = require('../errors');

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({createdBy: req.user._id}).sort('createdAt');

  res.status(StatusCodes.OK).json({count: jobs.length, jobs});
};

const getJob = async (req, res) => {
  const {_id: userId} = req.user;
  const {id: jobId} = req.params;

  const job = await Job.findOne({_id: jobId, createdBy: userId});

  if (!job) throw new NotFoundError(`No job with id ${jobId}`);

  res.status(StatusCodes.OK).json(job);
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user._id;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};

const updateJob = async (req, res) => {
  const {_id: userId} = req.user;
  const {id: jobId} = req.params;
  const updates = req.body;

  const job = await Job.findOneAndUpdate(
    {_id: jobId, createdBy: userId},
    updates,
    {new: true, runValidators: true}
  );

  if (!job) throw new NotFoundError(`No job with id ${jobId}`);

  res.status(StatusCodes.OK).json(job);
};

const deleteJob = async (req, res) => {
  const {_id: userId} = req.user;
  const {id: jobId} = req.params;

  const job = await Job.findOneAndDelete({_id: jobId, createdBy: userId});

  if (!job) throw new NotFoundError(`No job with id ${jobId}`);

  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
