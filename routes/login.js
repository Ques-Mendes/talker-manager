const express = require('express');

const crypto = require('crypto');

const middlewares = require('./middlewares');

const route = express.Router();

// https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

route.post('/', middlewares.loginValidation, (_req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = route;