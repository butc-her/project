const express = require('express');
const app = express.Router();
const NewsLetter = require('../models/NewsLetter');
const UserSubscribe = require('../models/UserSubscribe');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const layouts = '../views/layouts/main';

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or use your email provider's SMTP settings
  auth: {
      user: process.env.EMAIL,  // Use environment variables for sensitive data
      pass: process.env.EMAIL_PASSWORD,
  },
});

app.use(express.json()); // Ensure this middleware is present at the top

/**
 * GET
 * NEWSLETTER
 */
// Route to handle subscriptions and email sending
app.post('/newsletter', async (req, res) => {
  const { email } = req.body;

  // Validate email input
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required.' });
  }

  try {
    // Insert the email into MongoDB
    const newSubscriber = new NewsLetter({ email });
    await newSubscriber.save();

    console.log(`Subscriber ${email} added successfully!`);

    // Send a confirmation email to the subscriber
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Subscription Confirmation',
      text: 'Thank you for subscribing to our newsletter!',
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);

    // Respond with success
    res.status(201).json({
      success: true,
      message: 'Subscription successful! Confirmation email sent.',
    });
  } catch (err) {
    // Handle duplicate emails or other errors
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This email is already subscribed.',
      });
    }

    console.error('Error processing subscription:', err);
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
});
  
/**
 * GET
 * USER SUBSCRIBE
 */
// 07069275721 jerrydaniang691 dipd beuw uqfa huhg
app.post('/userSubscribe', async (req, res) => {
  const { firstname, lastname, mail } = req.body;
  let errors = [];

  // Validation
  if (!firstname || !lastname || !mail) {
      errors.push("All fields are required.");
  }
  if (mail && !/^\S+@\S+\.\S+$/.test(mail)) {
      errors.push("Please enter a valid email.");
  }

  if (errors.length) {
      console.log("Validation errors:", errors);
      return res.status(400).json({ success: false, errors });
  }

  try {
      // Save the new subscription to the database
      console.log("Saving user:", { firstname, lastname, mail });
      const newUser = new UserSubscribe({ firstname, lastname, mail });
      await newUser.save();

      // Set up the email content
      const mailOptions = {
          from: process.env.EMAIL,  // Sender email (your email)
          to: mail,  // Recipient email (user's email)
          subject: 'Welcome to Our Newsletter',
          text: `Hello ${firstname},\n\nThank you for subscribing to our newsletter! We will keep you updated with the latest news and offers.\n\nBest regards,\nThe Team`,
          html: `<h1>Welcome to Our Newsletter</h1><p>Hello ${firstname},</p><p>Thank you for subscribing to our newsletter! We will keep you updated with the latest news and offers.</p><p>Best regards,<br>The Team</p>`,
      };

      console.log("Sending email to:", mail);
      await transporter.sendMail(mailOptions);

      // Respond to the user
      res.status(200).json({ success: true, message: "Subscription successful and welcome email sent!" });
  } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).json({ success: false, message: `An unexpected error occurred: ${error.message}` });
  }
});

/**
 * GET
 * SEND US A MAIL
 */
  app.post('/sendEmail', async (req, res) => {
    const { email, subject, message } = req.body;
    let errors = [];

    // Validate the input
    if (!email) {
      errors.push("Email is required.");
    }
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      errors.push("Enter a valid email.");
    }
    if (!subject) {
      errors.push("Subject is required.");
    }
    if (!message) {
      errors.push("Message is required.");
    }

    // If validation errors exist, return them
    if (errors.length) {
      return res.status(400).json({ success: false, errors });
    }

    try {
      const mailOptions = {
        from: process.env.EMAIL, // Your email
        to: process.env.EMAIL, // Replace with your receiving email
        subject: `Message from: ${email} - ${subject}`,
        text: message,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (err) {
      console.error("Error sending email:", err);
      res.status(500).json({ success: false, message: `An unexpected error occurred: ${err.message}` });
    }
  });


module.exports = app;