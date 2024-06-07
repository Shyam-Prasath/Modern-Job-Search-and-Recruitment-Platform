const express = require("express");
const path = require("path");
const cors = require("cors");
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const multer = require("multer");
const UserData = require("../models/userData");
const JobData = require("../models/JobData");
const Register = require('../models/Register');
const app = express();
const dotenv = require('dotenv');
dotenv.config();


// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

mongoose.connect(process.env.userDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to User database"))
.catch(err => console.error("User DB Connection error:", err));

// Create a separate connection for JobData
const jobConnection = mongoose.createConnection(process.env.jobDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

jobConnection.on('connected', () => {
    console.log('Connected to Job database');
});

jobConnection.on('error', (err) => {
    console.error('Job DB Connection error:', err);
});

// Create a separate connection for Register
const RegisterConnection = mongoose.createConnection(process.env.RegisterDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

RegisterConnection.on('connected', () => {
    console.log('Connected to Register database');
});

RegisterConnection.on('error', (err) => {
    console.error('Register DB Connection error:', err);
});

// Serve static files from the React app public directory
app.use(express.static(path.join(__dirname, "../../frontend/public")));

// Serve uploaded resumes
app.use('/uploads-resume', express.static(path.join(__dirname, 'uploads-resume')));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads-resume/"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// API endpoint to save user data
app.post("/upload", upload.single("Resume"), async (req, res) => {
    const { Name, Email, Job, Degree } = req.body;
    const resumeUrl = `/uploads-resume/${req.file.filename}`;

    const newUser = new UserData({
        name: Name,
        email: Email,
        job: Job,
        degree: Degree,
        resume: resumeUrl
    });

    try {
        await newUser.save();
        res.status(201).json({ message: "User data saved successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save user data" });
    }
});

// For Canditate DataBase
app.get('/userData', async (req, res) => {
    try {
      const users = await UserData.find({});
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user data' });
    }
});

// Multer setup for company logo file uploads
const logoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads-company-logos/"); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    }
  });
  const uploadLogo = multer({ storage: logoStorage });

  // API endpoint to save job posting data
  app.post("/uploadJob", uploadLogo.single("CompanyLogo"), async (req, res) => {
    const { CompanyName, ContactEmail, JobTitle, JobDescription } = req.body;
    const companyLogoUrl = req.file.path; // Assuming company logo is a URL

    const newJob = new JobData({
      companyName: CompanyName,
      contactEmail: ContactEmail,
      jobTitle: JobTitle,
      jobDescription: JobDescription,
      companyLogo: companyLogoUrl
    });

    try {
      await newJob.save();
      res.status(201).json({ message: "Job posting saved successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to save job posting" });
    }
  });

  //For Job Database
  app.get('/jobData', async (req, res) => {
    try {
      const users = await JobData.find({});
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user data' });
    }
});

// Registration route
app.post('/register', async (req, res) => {
    const { name, email, password, category } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newRegister = new Register({
        name,
        email,
        password: hashedPassword,
        category
    });

    try {
        await newRegister.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to register user" });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password, category } = req.body;

    try {
        const user = await Register.findOne({ email, category });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email, password, or category' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email, password, or category' });
        }

        res.status(200).json({ message: 'Login successful', category: user.category });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
});

// Serve the React app for any other requests
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/public", "index.html"));
});

// Start the server
app.listen(3500, () => {
    console.log("Server is running at http://localhost:3500/");
});
