const express = require('express');
const router = express.Router();
const prisma = require('../config/prisma');
const slugify = require('slugify');
const authenticateToken = require('../middleware/auth');

router.get('/', async (req, res) => {
  const properties = await prisma.property.findMany({ include: { media: true, agent: true } });
  res.json(properties);
});

router.post('/', authenticateToken, async (req, res) => {
  const data = req.body;
  data.slug = slugify(data.title, { lower: true });
  const property = await prisma.property.create({ data });
  res.json(property);
});

module.exports = router;
