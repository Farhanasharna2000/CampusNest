const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage config to upload files directly to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "campusnest_admissions",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const parser = multer({ storage });

const uri = process.env.MONGO_URI;
const port = process.env.PORT || 4000;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const dbConnection = client.db("CampusNest");
    const usersCollection = dbConnection.collection("users");
    const admissionsCollection = dbConnection.collection("admissions");
    const reviewsCollection = dbConnection.collection("reviews");

    // Users API
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "User already exists" });
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // GET user profile
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = await usersCollection.findOne(query);
      if (!user) return res.status(404).send({ message: "User not found" });
      res.send(user);
    });

    // Update user profile
    app.patch("/users/:email", async (req, res) => {
      const email = req.params.email;
      const updatedFields = req.body;

      const result = await usersCollection.updateOne(
        { email },
        { $set: updatedFields }
      );

      if (result.matchedCount === 0) {
        return res.status(404).send({ message: "User not found" });
      }

      res.send({ message: "User updated successfully", result });
    });

    // Admission form submission with image upload
    app.post("/admissions", parser.single("image"), async (req, res) => {
      try {
        const admissionData = req.body;

        if (req.file && req.file.path) {
          admissionData.imageUrl = req.file.path; // Cloudinary URL
        } else {
          return res.status(400).send({ message: "Image upload failed" });
        }

        // Add college ID and submission timestamp
        admissionData.collegeId = parseInt(admissionData.collegeId);
        admissionData.submittedAt = new Date();
        admissionData.status = "submitted"; 

        // Check if user already has any admission
        const existingAdmission = await admissionsCollection.findOne({
          email: admissionData.email,
        });

        if (existingAdmission) {
          return res
            .status(409)
            .send({ message: "You have already applied to a college" });
        }

        // Insert admission data
        const result = await admissionsCollection.insertOne(admissionData);
        res.send({ message: "Application submitted successfully", result });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
      }
    });

    // Get admission by email
    app.get("/admissions/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const admission = await admissionsCollection.findOne({ email });

        if (!admission) {
          return res
            .status(404)
            .send({ message: "No admission found for this email" });
        }

        res.send(admission);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
      }
    });


    // Reviews API
    // Add a new review
app.post("/reviews", async (req, res) => {
  try {
    const { userEmail, collegeId, text, rating, userName,course,collegeName } = req.body;

    // Check if the user has an admission
    const admission = await admissionsCollection.findOne({ email: userEmail });

    if (!admission) {
      return res.status(403).json({ message: "Only admitted users can submit a review" });
    }

    //if multiple reviews by same user for the same college
    const existingReview = await reviewsCollection.findOne({ collegeId, userEmail });
    if (existingReview) {
      return res.status(409).json({ message: "You have already submitted a review for this college" });
    }

    const reviewData = {
      userEmail,
      collegeId,
      collegeName,
      course,
      userName,
      text,
      rating,
      createdAt: new Date(),
    };

    const result = await reviewsCollection.insertOne(reviewData);
    res.status(201).json({ message: "Review submitted", result });
  } catch (error) {
    console.error("Review error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


    // Get all reviews
    app.get("/reviews", async (req, res) => {
      try {
        const reviews = await reviewsCollection
          .find({})
          .sort({ createdAt: -1 })
          .toArray();
        res.send(reviews);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
      }
    });

  } finally {
    // Connection will remain open for the lifetime of the application
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("CampusNest Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
