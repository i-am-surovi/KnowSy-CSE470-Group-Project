import express from "express";
import Newsletter from "../models/Newsletter.js";

const newsletterRouter = express.Router();

// POST /api/newsletter/subscribe
newsletterRouter.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required." });
  }

  try {
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "You are already subscribed." });
    }

    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    res
      .status(201)
      .json({ success: true, message: "Subscription successful!" });
  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

export default newsletterRouter;
