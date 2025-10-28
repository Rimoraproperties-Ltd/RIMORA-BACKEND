const express = require('express');
const router = express.Router();
const prisma = require('../config/prisma');
const sendMail = require('../utils/mailer');

router.post('/', async (req, res) => {
  const inquiry = await prisma.inquiry.create({ data: req.body });

  await sendMail({
    to: process.env.EMAIL_TO,
    subject: `New Inquiry for Property ID: ${req.body.propertyId || 'N/A'}`,
    text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nPhone: ${req.body.phone}\nMessage: ${req.body.message}`
  });

  res.json({ message: 'Inquiry sent successfully', inquiry });
});

module.exports = router;
