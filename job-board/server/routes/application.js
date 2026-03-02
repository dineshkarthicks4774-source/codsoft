const router = require("express").Router();
const Application = require("../models/application");
const multer = require("multer");
const nodemailer = require("nodemailer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage });

// Apply Job
router.post("/", upload.single("resume"), async (req, res) => {
  const application = await Application.create({
    jobId: req.body.jobId,
    candidateId: req.body.candidateId,
    resume: req.file.path
  });

  // Email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: req.body.email,
    subject: "Application Submitted",
    text: "Your job application was successfully submitted!"
  });

  res.json(application);
});

module.exports = router;