const cron = require('node-cron');
const nodemailer = require('nodemailer');
const UserSubscribe = require('../models/UserSubscribe'); // Adjust path if needed

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Or your email provider's SMTP
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Define the newsletter content
const sendNewsletter = async () => {
    try {
        const subscribers = await UserSubscribe.find({});
        const emails = subscribers.map(subscriber => subscriber.mail);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: emails,
            subject: 'Your Monthly Newsletter',
            text: 'Hello! Here’s the latest news...',
            html: '<h1>Your Monthly Newsletter</h1><p>Here’s the latest news...</p>',
        };

        await transporter.sendMail(mailOptions);
        console.log('Newsletter sent to all subscribers.');
    } catch (error) {
        console.error('Error sending newsletter:', error);
    }
};

// Schedule the newsletter to send every month
cron.schedule('0 0 1 * *', () => {
    console.log('Running scheduled newsletter...');
    sendNewsletter();
});

module.exports = { sendNewsletter };