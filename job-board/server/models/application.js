const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  resume: String,
  status: { type: String, default: "Applied" }
}, { timestamps: true });

module.exports = mongoose.model("Application", ApplicationSchema);