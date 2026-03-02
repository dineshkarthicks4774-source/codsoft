const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const Job = require("./models/job.js"); // ✅

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/jobs", require("./routes/jobs.js"));
app.use("/api/applications", require("./routes/application.js"));

// ✅ TEMP ROUTE
app.get("/add-job", async (req, res) => {
  try {
    const newJob = new Job({
      title: "Backend Developer",
      company: "Microsoft",
      location: "Hyderabad",
      description: "Node.js developer required"
    });

    await newJob.save();
    res.send("Job Added Successfully!");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
  console.log("Add job: http://localhost:5000/add-job");
});