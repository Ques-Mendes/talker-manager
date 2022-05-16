const express = require('express');

const fs = require('fs');

const route = express.Router();

route.get('/', (_req, res) => {
  const talker = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  res.status(200).json(talker);
  if (!talker.length) return res.status(200).json([]);
});

module.exports = route;