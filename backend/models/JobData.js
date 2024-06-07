const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  companyName: String,
  contactEmail: String,
  jobTitle: String,
  jobDescription: String,
  companyLogo: String // Assuming CompanyLogo is a string
});

const JobData = mongoose.model('JobData', jobSchema);

module.exports = JobData;

