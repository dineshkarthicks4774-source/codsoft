const router = require("express").Router();
const Job = require("../models/job");

// Create Job
router.post("/", async (req, res) => {
  const job = await Job.create(req.body);
  res.json(job);
});

// Get All Jobs
router.get("/", async (req, res) => {
  const jobs = await Job.find().populate("postedBy", "name");
  res.json(jobs);
});

// Get Single Job
router.get("/:id", async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.json(job);
});

// Search
router.get("/search/:keyword", async (req, res) => {
  const jobs = await Job.find({
    title: { $regex: req.params.keyword, $options: "i" }
  });
  res.json(jobs);
});

module.exports = router;